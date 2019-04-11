(ns mrsudoku.model.conflict
  (:require [clojure.set :as set]
            [mrsudoku.model.grid :as g]))


;; ========================================================================
;; Fichier à compléter : il faut utiliser les fonctions du namespace grid.
;; et regarder également les tests dans `test/cljs/mrsudoku/conflict_test.cljs`
;; et bien sûr `test/cljs/mrsudoku/grid_test.cljs`  (et les autres tests ...)
;; ========================================================================

(defn values
  "Return the set of values of a vector or grid `cells`."
  [cells]
  ;; Attention : réponse fausse
  (loop [s cells, res #{}]
    (if (seq s)
      (if (= (get (first s) :value) nil)
        (recur (rest s) res)
        (recur (rest s) (conj res (get (first s) :value))))
      res)))

(defn values-except
  "Return the set of values of a vector of cells, except the `except`-th."
  [cells except]
  {:pre [(<= 1 except (count cells))]}
  (loop [s cells, c 1, res []]
    (if (seq s)
      (if (or (= (get (first s) :value) nil) (= c except))
        (recur (rest s) (+ c 1) res)
        (recur (rest s) (+ c 1) (conj res (get (first s) :value))))
      (into #{} res))))

(defn mk-conflict [kind cx cy value]
  {:status :conflict
   :kind kind
   :value value})

(defn merge-conflict-kind
  [kind1 kind2]
  (println kind1 kind2)
  (if (coll? kind1)
    (if (coll? kind2)
      (loop [s kind1, res kind2]
        (if (seq s)
          (recur (rest s) (conj res (first s)))
          res))
      (conj kind1 kind2))
    (if (coll? kind2)
      (conj kind2 kind1)
      (if (= kind1 kind2)
        kind1
        (hash-set kind1 kind2)))))

(defn merge-conflict [conflict1 conflict2]
  ;; Attention : réponse fausse
  conflict1)

(defn merge-conflicts [& conflicts]
  (apply (partial merge-with merge-conflict) conflicts))

(defn update-conflicts
  [conflict-kind cx cy value conflicts]
  (if-let [conflict (get conflicts [cx, cy])]
    (assoc conflicts [cx, cy] (mk-conflict (merge-conflict-kind conflict-kind (:kind conflict))
                                           cx cy value))
    (assoc conflicts [cx, cy] (mk-conflict conflict-kind cx cy value))))

(defn conflict-value [values except cell]
  (when-let [value (g/cell-value cell)]
    (when (and (not= (:status cell) :init)
               (contains? (values-except values except) value))
      value)))

(defn col-conflicts
  "Returns a map of conflicts in a `col`."
  [col cx]
  (loop [cy 1, cells (seq col), conflicts {}]
    ;(println conflicts)
    (if (seq cells)
      (let [cell (first cells)]
        (if-let [value (conflict-value col cy cell)]
          (recur (+ cy 1) (rest cells) (update-conflicts :col cx cy value conflicts))
          (recur (+ cy 1) (rest cells) conflicts)))
      ;; no more cells
      conflicts)))

(defn cols-conflicts
  [grid] (reduce merge-conflicts {}
                 (map (fn [c] (col-conflicts (g/col grid c) c)) (range 1 10))))



(defn row-conflicts
  "Returns a map of conflicts in a `row`."
  [row cy]
  (loop [s row, i 1, res {}]
    (if (seq s)
      (let [val (get (first s) :value)]
        (if (= val cy)
          (recur (rest s) (+ i 1) (conj res (vector (vector i val) (array-map :status :conflict :kind :row :value val))))
          (recur (rest s) (+ i 1) res)))
      (if (= (count res) 1)
        {}
        res))))

(defn rows-conflicts
  "Returns a map of conflicts in all rows of `grid`"
  [grid]
  (loop [s grid, res {}]
    (if (seq s)
      (recur (rest s) (concatv res (into [] (for [x (range 10) y (range (count first s))] (row-conflicts (g/row grid y) x))))))))

(defn block-conflicts
  [block b]
  (g/reduce-block (fn [conflicts index cx cy cell]
                    (if-let [value (conflict-value block index cell)]
                      (update-conflicts :block cx cy value conflicts)
                      conflicts)) {} block b))

(defn blocks-conflicts
  [grid]
  (reduce merge-conflicts {}
          (map (fn [b] (block-conflicts (g/block grid b) b)) (range 1 10))))

(defn grid-conflicts
  "Compute all conflicts in the Sudoku grid."
  [grid]
  (println "compute conflicts")
  (println (g/grid->str grid))
  (merge-conflicts (rows-conflicts grid)
                   (cols-conflicts grid)
                   (blocks-conflicts grid)))
