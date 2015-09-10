/**
 * Created by fiona.xu on 2015/9/8.
 */
define(["../util","../component/add_dlg_component"], function (util,dlg_component) {
    var draggable = {
        vm:"",
        fileterobj:"",
        drag: function (ev) {
            ev.dataTransfer.effectAllowed = "move";
            var elem = ev.target
            ev.dataTransfer.setData("typede", $(elem).data("typede"));//维度度量 大类分
            ev.dataTransfer.setData("type", $(elem).parent(".input-content").data("type")); //行列分类
            ev.dataTransfer.setData("id", $(elem).data("id"));
            ev.dataTransfer.setData("index", $(elem).data("index"));
            ev.dataTransfer.setData("name", ev.target.innerHTML);
            ev.dataTransfer.setData("isMagnanmity", ev.target.innerHTML);
        },
        drop: function (ev, vm) {
            var id = ev.dataTransfer.getData("id");
            var name = ev.dataTransfer.getData("name");
            var typede_from = ev.dataTransfer.getData("typede");
            var elem = $(ev.currentTarget);
            var type = elem.data("type");
            var typede = elem.data("typede");
            var data = ev.dataTransfer.getData("data");
            if (typede_from != typede) {//维度 度量大类需一致
                return;
            }
            var type_from = ev.dataTransfer.getData("type");
            var index = NaN;
            if (!!type && type_from != 'null') { //行列小类判断
                if (type === type_from) {
                    index = parseInt(ev.dataTransfer.getData("index"), 10);
                } else {
                    var index = parseInt(ev.dataTransfer.getData("index"), 10);
                    vm.data.selected_den[type_from].splice(index, 1);
                }
            }
            if (!id || !name) {
                return;
            }
            var xpos = ev.offsetX;
            var target_index = null;

            var selectedElem = elem.find(".selected-" + typede);
            for (var i = 0; i < selectedElem.length; i++) {
                var elem_i = selectedElem[i];
                var left = elem_i.offsetLeft + elem_i.offsetWidth / 2; //通过坐标判断位置 只判一层
                if (xpos < left) {
                    target_index = i;
                    break;
                }
            }
            var type = elem.data("type");
            var arr = _.findWhere(vm.data.selected_den[type], {"id": id});

            target_index = target_index === null ? selectedElem.length : target_index;
            if (!(isNaN(index) && !!arr)) {
                vm.data.selected_den[type].splice(target_index, 0, {"id": id, "name": name});
            } else {
                return;
            }
            if (!!arr && !isNaN(index)) {
                //内部调位置
                if (target_index <= index) {
                    index += 1;
                }
                vm.data.selected_den[type].splice(index, 1);
            }

            vm.$fire("data.selected_den", vm.data.selected_den);
        },
        copy: function (vm) {
            var type = parseInt(vm.type, 10);
            switch (type) {
                case 1:
                case 2://copy
                    if (type == 1) {
                        this.fileterobj = _.find(vm.data.dimension, function (data) {
                            return data.id == vm.right_click_demid
                        });
                    } else {
                        this.fileterobj = _.find(vm.data.dimension_new, function (data) {
                            return data.id == vm.right_click_demid
                        });

                    }
                    var obj = util.cloneObject(this.fileterobj, true);
                    obj.label = obj.label + "(复制)";
                    obj.id = util.generateId("dimen_");
                    vm.data.dimension_new.push(obj);
                    break
                case 3:
                case 4:
                    if (type == 3) {
                        this.fileterobj = _.find(vm.data.magnanimity, function (data) {
                            return data.id == vm.right_click_demid
                        });
                    } else {
                        this.fileterobj = _.find(vm.data.magnanimity_new, function (data) {
                            return data.id == vm.right_click_demid
                        });
                    }
                    var obj = util.cloneObject(this.fileterobj, true);
                    obj.label = obj.label + "(复制)";
                    obj.id = util.generateId("metric_");
                    vm.data.magnanimity_new.push(obj);
                    break
            }
        },
        delete: function (vm) {
            var type = parseInt(vm.type, 10);
            switch (type) {
                case 2:
                    var fileterobj = _.find(vm.data.dimension_new, function (data) {
                        return data.id == vm.right_click_demid
                    });
                    vm.data.dimension_new.remove(fileterobj);
                    break;
                case 4://delete
                    var fileterobj = _.find(vm.data.magnanimity_new, function (data) {
                        return data.id == vm.right_click_demid
                    });

                    vm.data.magnanimity_new.remove(fileterobj);
                    break;
            }
        },
        getFilterObj: function(type,vm){
            switch (type) {
                case 2:
                    this.fileterobj = _.find(vm.data.dimension_new, function (data) {
                        return data.id == vm.right_click_demid
                    });
                    break;
                case 4://delete
                    this.fileterobj = _.find(vm.data.magnanimity_new, function (data) {
                        return data.id == vm.right_click_demid
                    });
                    break;
            }
            return this.fileterobj;
        },
        edit: function (vm) {
            var type = parseInt(vm.type, 10);
            switch (type) {
                case 2:
                    var content = "create_dimension";
                    var handler = this.updateDiemen;
                    break;
                case 4:
                    var content = "create_metric";
                    var handler = this.undateMetric;
                    break;
            }
            var filterObj = this.getFilterObj(type,vm);
            var option = {
                title:"编辑字段",
                content:content,
                initHandlers:[function(){$(".edit-name").val(filterObj.label);console.log(filterObj.label)}],
                buttons:[{text: "确定", handler:handler},{text: "取消", handler:dlg_component.closeDlg}]
            }
            dlg_component.showDlg(option);
        },
        updateDiemen: function(){//TODO 调用后端
            //this.fileterobj.label = $(".edit-name").val();
        },
        undateMetric: function(){//TODO 调用后端
            //this.fileterobj.label = $(".edit-name").val();
        }

    };
    return draggable;
});