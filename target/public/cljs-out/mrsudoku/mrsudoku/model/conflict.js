// Compiled by ClojureScript 1.10.339 {}
goog.provide('mrsudoku.model.conflict');
goog.require('cljs.core');
goog.require('clojure.set');
goog.require('mrsudoku.model.grid');
/**
 * Return the set of values of a vector or grid `cells`.
 */
mrsudoku.model.conflict.values = (function mrsudoku$model$conflict$values(cells){
var s = cells;
var res = cljs.core.PersistentHashSet.EMPTY;
while(true){
if(cljs.core.seq.call(null,s)){
if(cljs.core._EQ_.call(null,cljs.core.get.call(null,cljs.core.first.call(null,s),new cljs.core.Keyword(null,"value","value",305978217)),null)){
var G__10674 = cljs.core.rest.call(null,s);
var G__10675 = res;
s = G__10674;
res = G__10675;
continue;
} else {
var G__10676 = cljs.core.rest.call(null,s);
var G__10677 = cljs.core.conj.call(null,res,cljs.core.get.call(null,cljs.core.first.call(null,s),new cljs.core.Keyword(null,"value","value",305978217)));
s = G__10676;
res = G__10677;
continue;
}
} else {
return res;
}
break;
}
});
/**
 * Return the set of values of a vector of cells, except the `except`-th.
 */
mrsudoku.model.conflict.values_except = (function mrsudoku$model$conflict$values_except(cells,except){
if(((((1) <= except)) && ((except <= cljs.core.count.call(null,cells))))){
} else {
throw (new Error("Assert failed: (<= 1 except (count cells))"));
}

var s = cells;
var c = (1);
var res = cljs.core.PersistentVector.EMPTY;
while(true){
if(cljs.core.seq.call(null,s)){
if(((cljs.core._EQ_.call(null,cljs.core.get.call(null,cljs.core.first.call(null,s),new cljs.core.Keyword(null,"value","value",305978217)),null)) || (cljs.core._EQ_.call(null,c,except)))){
var G__10678 = cljs.core.rest.call(null,s);
var G__10679 = (c + (1));
var G__10680 = res;
s = G__10678;
c = G__10679;
res = G__10680;
continue;
} else {
var G__10681 = cljs.core.rest.call(null,s);
var G__10682 = (c + (1));
var G__10683 = cljs.core.conj.call(null,res,cljs.core.get.call(null,cljs.core.first.call(null,s),new cljs.core.Keyword(null,"value","value",305978217)));
s = G__10681;
c = G__10682;
res = G__10683;
continue;
}
} else {
return cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,res);
}
break;
}
});
mrsudoku.model.conflict.mk_conflict = (function mrsudoku$model$conflict$mk_conflict(kind,cx,cy,value){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"conflict","conflict",1978796605),new cljs.core.Keyword(null,"kind","kind",-717265803),kind,new cljs.core.Keyword(null,"value","value",305978217),value], null);
});
mrsudoku.model.conflict.merge_conflict_kind = (function mrsudoku$model$conflict$merge_conflict_kind(kind1,kind2){
cljs.core.println.call(null,kind1,kind2);

if(cljs.core.coll_QMARK_.call(null,kind1)){
if(cljs.core.coll_QMARK_.call(null,kind2)){
var s = kind1;
var res = kind2;
while(true){
if(cljs.core.seq.call(null,s)){
var G__10684 = cljs.core.rest.call(null,s);
var G__10685 = cljs.core.conj.call(null,res,cljs.core.first.call(null,s));
s = G__10684;
res = G__10685;
continue;
} else {
return res;
}
break;
}
} else {
return cljs.core.conj.call(null,kind1,kind2);
}
} else {
if(cljs.core.coll_QMARK_.call(null,kind2)){
return cljs.core.conj.call(null,kind2,kind1);
} else {
if(cljs.core._EQ_.call(null,kind1,kind2)){
return kind1;
} else {
return cljs.core.PersistentHashSet.createAsIfByAssoc([kind1,kind2]);
}
}
}
});
mrsudoku.model.conflict.merge_conflict = (function mrsudoku$model$conflict$merge_conflict(conflict1,conflict2){
return conflict1;
});
mrsudoku.model.conflict.merge_conflicts = (function mrsudoku$model$conflict$merge_conflicts(var_args){
var args__4534__auto__ = [];
var len__4531__auto___10687 = arguments.length;
var i__4532__auto___10688 = (0);
while(true){
if((i__4532__auto___10688 < len__4531__auto___10687)){
args__4534__auto__.push((arguments[i__4532__auto___10688]));

var G__10689 = (i__4532__auto___10688 + (1));
i__4532__auto___10688 = G__10689;
continue;
} else {
}
break;
}

var argseq__4535__auto__ = ((((0) < args__4534__auto__.length))?(new cljs.core.IndexedSeq(args__4534__auto__.slice((0)),(0),null)):null);
return mrsudoku.model.conflict.merge_conflicts.cljs$core$IFn$_invoke$arity$variadic(argseq__4535__auto__);
});

mrsudoku.model.conflict.merge_conflicts.cljs$core$IFn$_invoke$arity$variadic = (function (conflicts){
return cljs.core.apply.call(null,cljs.core.partial.call(null,cljs.core.merge_with,mrsudoku.model.conflict.merge_conflict),conflicts);
});

mrsudoku.model.conflict.merge_conflicts.cljs$lang$maxFixedArity = (0);

/** @this {Function} */
mrsudoku.model.conflict.merge_conflicts.cljs$lang$applyTo = (function (seq10686){
var self__4519__auto__ = this;
return self__4519__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq10686));
});

mrsudoku.model.conflict.update_conflicts = (function mrsudoku$model$conflict$update_conflicts(conflict_kind,cx,cy,value,conflicts){
var temp__5718__auto__ = cljs.core.get.call(null,conflicts,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cx,cy], null));
if(cljs.core.truth_(temp__5718__auto__)){
var conflict = temp__5718__auto__;
return cljs.core.assoc.call(null,conflicts,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cx,cy], null),mrsudoku.model.conflict.mk_conflict.call(null,mrsudoku.model.conflict.merge_conflict_kind.call(null,conflict_kind,new cljs.core.Keyword(null,"kind","kind",-717265803).cljs$core$IFn$_invoke$arity$1(conflict)),cx,cy,value));
} else {
return cljs.core.assoc.call(null,conflicts,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cx,cy], null),mrsudoku.model.conflict.mk_conflict.call(null,conflict_kind,cx,cy,value));
}
});
mrsudoku.model.conflict.conflict_value = (function mrsudoku$model$conflict$conflict_value(values,except,cell){
var temp__5720__auto__ = mrsudoku.model.grid.cell_value.call(null,cell);
if(cljs.core.truth_(temp__5720__auto__)){
var value = temp__5720__auto__;
if(((cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"status","status",-1997798413).cljs$core$IFn$_invoke$arity$1(cell),new cljs.core.Keyword(null,"init","init",-1875481434))) && (cljs.core.contains_QMARK_.call(null,mrsudoku.model.conflict.values_except.call(null,values,except),value)))){
return value;
} else {
return null;
}
} else {
return null;
}
});
/**
 * Returns a map of conflicts in a `col`.
 */
mrsudoku.model.conflict.col_conflicts = (function mrsudoku$model$conflict$col_conflicts(col,cx){
var cy = (1);
var cells = cljs.core.seq.call(null,col);
var conflicts = cljs.core.PersistentArrayMap.EMPTY;
while(true){
if(cljs.core.seq.call(null,cells)){
var cell = cljs.core.first.call(null,cells);
var temp__5718__auto__ = mrsudoku.model.conflict.conflict_value.call(null,col,cy,cell);
if(cljs.core.truth_(temp__5718__auto__)){
var value = temp__5718__auto__;
var G__10690 = (cy + (1));
var G__10691 = cljs.core.rest.call(null,cells);
var G__10692 = mrsudoku.model.conflict.update_conflicts.call(null,new cljs.core.Keyword(null,"col","col",-1959363084),cx,cy,value,conflicts);
cy = G__10690;
cells = G__10691;
conflicts = G__10692;
continue;
} else {
var G__10693 = (cy + (1));
var G__10694 = cljs.core.rest.call(null,cells);
var G__10695 = conflicts;
cy = G__10693;
cells = G__10694;
conflicts = G__10695;
continue;
}
} else {
return conflicts;
}
break;
}
});
mrsudoku.model.conflict.cols_conflicts = (function mrsudoku$model$conflict$cols_conflicts(grid){
return cljs.core.reduce.call(null,mrsudoku.model.conflict.merge_conflicts,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,(function (c){
return mrsudoku.model.conflict.col_conflicts.call(null,mrsudoku.model.grid.col.call(null,grid,c),c);
}),cljs.core.range.call(null,(1),(10))));
});
/**
 * Returns a map of conflicts in a `row`.
 */
mrsudoku.model.conflict.row_conflicts = (function mrsudoku$model$conflict$row_conflicts(row,cy){
var s = row;
var i = (1);
var res = cljs.core.PersistentArrayMap.EMPTY;
while(true){
if(cljs.core.seq.call(null,s)){
var val = cljs.core.get.call(null,cljs.core.first.call(null,s),new cljs.core.Keyword(null,"value","value",305978217));
if(cljs.core._EQ_.call(null,val,cy)){
var G__10696 = cljs.core.rest.call(null,s);
var G__10697 = (i + (1));
var G__10698 = cljs.core.conj.call(null,res,(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[i,val],null)),(new cljs.core.PersistentArrayMap(null,(3),[new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"conflict","conflict",1978796605),new cljs.core.Keyword(null,"kind","kind",-717265803),new cljs.core.Keyword(null,"row","row",-570139521),new cljs.core.Keyword(null,"value","value",305978217),val],null))],null)));
s = G__10696;
i = G__10697;
res = G__10698;
continue;
} else {
var G__10699 = cljs.core.rest.call(null,s);
var G__10700 = (i + (1));
var G__10701 = res;
s = G__10699;
i = G__10700;
res = G__10701;
continue;
}
} else {
if(cljs.core._EQ_.call(null,cljs.core.count.call(null,res),(1))){
return cljs.core.PersistentArrayMap.EMPTY;
} else {
return res;
}
}
break;
}
});
/**
 * Returns a map of conflicts in all rows of `grid`
 */
mrsudoku.model.conflict.rows_conflicts = (function mrsudoku$model$conflict$rows_conflicts(grid){
var s = grid;
var res = cljs.core.PersistentArrayMap.EMPTY;
while(true){
if(cljs.core.seq.call(null,s)){
var G__10708 = cljs.core.rest.call(null,s);
var G__10709 = mrsudoku.model.conflict.concatv.call(null,res,cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,(function (){var iter__4324__auto__ = ((function (s,res){
return (function mrsudoku$model$conflict$rows_conflicts_$_iter__10702(s__10703){
return (new cljs.core.LazySeq(null,((function (s,res){
return (function (){
var s__10703__$1 = s__10703;
while(true){
var temp__5720__auto__ = cljs.core.seq.call(null,s__10703__$1);
if(temp__5720__auto__){
var xs__6277__auto__ = temp__5720__auto__;
var x = cljs.core.first.call(null,xs__6277__auto__);
var iterys__4320__auto__ = ((function (s__10703__$1,s,res,x,xs__6277__auto__,temp__5720__auto__){
return (function mrsudoku$model$conflict$rows_conflicts_$_iter__10702_$_iter__10704(s__10705){
return (new cljs.core.LazySeq(null,((function (s__10703__$1,s,res,x,xs__6277__auto__,temp__5720__auto__){
return (function (){
var s__10705__$1 = s__10705;
while(true){
var temp__5720__auto____$1 = cljs.core.seq.call(null,s__10705__$1);
if(temp__5720__auto____$1){
var s__10705__$2 = temp__5720__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,s__10705__$2)){
var c__4322__auto__ = cljs.core.chunk_first.call(null,s__10705__$2);
var size__4323__auto__ = cljs.core.count.call(null,c__4322__auto__);
var b__10707 = cljs.core.chunk_buffer.call(null,size__4323__auto__);
if((function (){var i__10706 = (0);
while(true){
if((i__10706 < size__4323__auto__)){
var y = cljs.core._nth.call(null,c__4322__auto__,i__10706);
cljs.core.chunk_append.call(null,b__10707,mrsudoku.model.conflict.row_conflicts.call(null,mrsudoku.model.grid.row.call(null,grid,y),x));

var G__10710 = (i__10706 + (1));
i__10706 = G__10710;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10707),mrsudoku$model$conflict$rows_conflicts_$_iter__10702_$_iter__10704.call(null,cljs.core.chunk_rest.call(null,s__10705__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10707),null);
}
} else {
var y = cljs.core.first.call(null,s__10705__$2);
return cljs.core.cons.call(null,mrsudoku.model.conflict.row_conflicts.call(null,mrsudoku.model.grid.row.call(null,grid,y),x),mrsudoku$model$conflict$rows_conflicts_$_iter__10702_$_iter__10704.call(null,cljs.core.rest.call(null,s__10705__$2)));
}
} else {
return null;
}
break;
}
});})(s__10703__$1,s,res,x,xs__6277__auto__,temp__5720__auto__))
,null,null));
});})(s__10703__$1,s,res,x,xs__6277__auto__,temp__5720__auto__))
;
var fs__4321__auto__ = cljs.core.seq.call(null,iterys__4320__auto__.call(null,cljs.core.range.call(null,cljs.core.count.call(null,cljs.core.first,s))));
if(fs__4321__auto__){
return cljs.core.concat.call(null,fs__4321__auto__,mrsudoku$model$conflict$rows_conflicts_$_iter__10702.call(null,cljs.core.rest.call(null,s__10703__$1)));
} else {
var G__10711 = cljs.core.rest.call(null,s__10703__$1);
s__10703__$1 = G__10711;
continue;
}
} else {
return null;
}
break;
}
});})(s,res))
,null,null));
});})(s,res))
;
return iter__4324__auto__.call(null,cljs.core.range.call(null,(10)));
})()));
s = G__10708;
res = G__10709;
continue;
} else {
return null;
}
break;
}
});
mrsudoku.model.conflict.block_conflicts = (function mrsudoku$model$conflict$block_conflicts(block,b){
return mrsudoku.model.grid.reduce_block.call(null,(function (conflicts,index,cx,cy,cell){
var temp__5718__auto__ = mrsudoku.model.conflict.conflict_value.call(null,block,index,cell);
if(cljs.core.truth_(temp__5718__auto__)){
var value = temp__5718__auto__;
return mrsudoku.model.conflict.update_conflicts.call(null,new cljs.core.Keyword(null,"block","block",664686210),cx,cy,value,conflicts);
} else {
return conflicts;
}
}),cljs.core.PersistentArrayMap.EMPTY,block,b);
});
mrsudoku.model.conflict.blocks_conflicts = (function mrsudoku$model$conflict$blocks_conflicts(grid){
return cljs.core.reduce.call(null,mrsudoku.model.conflict.merge_conflicts,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,(function (b){
return mrsudoku.model.conflict.block_conflicts.call(null,mrsudoku.model.grid.block.call(null,grid,b),b);
}),cljs.core.range.call(null,(1),(10))));
});
/**
 * Compute all conflicts in the Sudoku grid.
 */
mrsudoku.model.conflict.grid_conflicts = (function mrsudoku$model$conflict$grid_conflicts(grid){
cljs.core.println.call(null,"compute conflicts");

cljs.core.println.call(null,mrsudoku.model.grid.grid__GT_str.call(null,grid));

return mrsudoku.model.conflict.merge_conflicts.call(null,mrsudoku.model.conflict.rows_conflicts.call(null,grid),mrsudoku.model.conflict.cols_conflicts.call(null,grid),mrsudoku.model.conflict.blocks_conflicts.call(null,grid));
});

//# sourceMappingURL=conflict.js.map
