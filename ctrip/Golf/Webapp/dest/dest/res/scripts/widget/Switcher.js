define(["res/libs/inherit","res/libs/EventEmitter"],function(a,b){var c,d;return d=a({name:"SwitcherManager",proto:{__constructor:function(a){if(this.switchers=[],this.selectedSwitcher=null,_.extend(this,a),this._check(),this.nodes){var b=this;_.each(this.nodes,function(a){var c=new b.Switcher({node:$(a)});b.addSwitcher(c)})}},_check:function(){if(this.nodes&&!this.Switcher)throw new Error("[SwitcherManager] need the argument Switcher.")},getByIndex:function(a){return this.switchers[a]},addSwitcher:function(a){if(!(a instanceof c))throw new Error("[Switcher.manager.addSwitcher] the object is not a Switcher");return a.on("all",_.bind(function(b){this.onSwitcherAll(b,a)},this)),this.switchers.push(a),this},onSwitcherAll:function(a,b){this.emit(a,b)}}}),b.mixTo(d),c=a({name:"Switcher",proto:{__constructor:function(a){_.extend(this,a),this.isSelected=this.node.hasClass(this.CLASS_NAME.SELECTED),this.node.on("click",_.bind(this.onNodeClick,this))},getValue:function(){return this.isSelected},unselect:function(){this.node.removeClass(this.CLASS_NAME.SELECTED).addClass(this.CLASS_NAME.NOT_SELECT),this.isSelected=!1,this.emit("unselect")},select:function(){this.node.removeClass(this.CLASS_NAME.NOT_SELECT).addClass(this.CLASS_NAME.SELECTED),this.isSelected=!0,this.emit("select")},onNodeClick:function(){this.isSelected||this.select()}},statics:{Manager:d}}),b.mixTo(c),c});