/*define(["avalon"],function(avalon){*/
define([],function(){
     var avalonHelper={
         access:function(el,vms){
             if(!vms)avalon.error("access need vmodels")
             for(var i=0;i<vms.length;i++){
                 var vm=vms[i]
                 var el_tmp="vm."+el;
                 try{
                     var name=el_tmp.substring(el_tmp.lastIndexOf("\.")+1)
                     var tar= el_tmp.substring(0,el_tmp.lastIndexOf("\."))
                     try{
                         if(eval(tar)==undefined)continue
                     }catch (e){continue}
                     var flag=eval(tar+".hasOwnProperty('"+name+"')")
                     if(!flag)continue;
                     var $accessors=eval(tar +".$accessors");
                     if(!$accessors){
                         continue
                     }else if($accessors[name]){
                         return $accessors[name]
                     }else{
                         var func=eval(tar+"."+name)
                         if(func&&(typeof func=="function" || typeof  func=='object')){
                             return func;
                         }else{
                             continue
                         }
                     }
                 }catch(e){
                     if(console)console.error(el+" is undefined")
                     return null;
                 }
             }
         },
         watch:function(el,vms,callback){
             for(var i=0;i<vms.length;i++){
                 var vm=vms[i]
                 var el_tmp="vm."+el;
                 try{
                     var name=el_tmp.substring(el_tmp.lastIndexOf("\.")+1)
                     var tar= el_tmp.substring(0,el_tmp.lastIndexOf("\."))
                     try{
                         if(eval(tar)==undefined)continue
                     }catch (e){continue}
                     var flag=eval(tar+".hasOwnProperty('"+name+"')")
                     if(!flag)continue;
                     var watcher=eval(tar +".$watch");
                     if(!watcher)continue
                     watcher.call(eval(tar),name,callback);
                     break;
                 }catch(e){
                     if(console)console.error(el+" is undefined")
                 }
             }
         },
         fire:function(el,vms){
             for(var i=0;i<vms.length;i++){
                 var vm=vms[i]
                 var el_tmp="vm."+el;
                 try{
                     var name=el_tmp.substring(el_tmp.lastIndexOf("\.")+1)
                     var tar= el_tmp.substring(0,el_tmp.lastIndexOf("\."))
                     try{
                         if(eval(tar)==undefined)continue
                     }catch (e){continue;}
                     var flag=eval(tar+".hasOwnProperty('"+name+"')")
                     if(!flag)continue;
                     var fire=eval(tar +".$fire");
                     if(!fire)continue
                     fire.call(eval(tar),name);
                     break;
                 }catch(e){
                     if(console)console.error(el+" is undefined")
                 }
             }
         }
     }
     return avalonHelper;
})
