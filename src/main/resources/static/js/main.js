$(document).ready(function () {
    /** Create Canvas */
    fabric.Object.prototype.transparentCorners = false;
    //fabric.Object.prototype.padding = 5;
    var grid = $("#gridSize").val();
    var canvas = this.__canvas = new fabric.Canvas('canvas-area');
    canvas.setHeight(300);
    canvas.setWidth(450);
    $('.canvas-container').addClass('yoko');

    $('#gridSize').change(function () {
        var newVal = $(this).val();
        console.log(newVal);
    });

    /** change fontScale to fontSize */
    $('#text-font-size').keyup(function () {
        var val = $(this).val();
        if (isNaN(val)) {
            alert('please enter number');
            $(this).val('');
        }
        var activeObject = canvas.getActiveObject();
        activeObject.fontSize = val;
        canvas.renderAll();
    });

    $('#add-text-btn').click(function () {
        if ($('#text-font-size').val()) {
            var txtfontsize = $('#text-font-size').val();
        } else {
            txtfontsize = 45;
        }
        var new_text = new fabric.IText("Text", {
            left: 100,
            top: 100,
            fontSize: txtfontsize,
            lockUniScaling: true,
            fontFamily: "helvetica",
            fill: '#000000'
        });
        canvas.add(new_text);
        canvas.setActiveObject(new_text);
    });

    canvas.on('object:scaling', function (event) {
        console.log("scale");
        if (event.target.text) {
            //$('#text-color').spectrum("set", hexToRgb(event.target.fill));
            $("#text-font-size").val((event.target.fontSize * event.target.scaleX).toFixed(0));
        }
    });

    canvas.on('object:modified', function (event) {
        console.log("modi");
        if (event.target.text) {
            $('#text-color').spectrum("set", event.target.fill);
            event.target.fontSize *= event.target.scaleX;
            event.target.fontSize = event.target.fontSize.toFixed(0);
            event.target.scaleX = 1;
            event.target.scaleY = 1;
            $("#text-font-size").val(event.target.fontSize);
            //event.target._clearCache();
        }
    });

    /** Object Move in Canvas */
    canvas.on('object:moving', function (event) {
        console.log("move");
        var obj = event.target;
        // if object is too big ignore
        if (obj.getBoundingRect().height > canvas.height || obj.getBoundingRect().width > obj.canvas.width) {
            return;
        }
        obj.setCoords();
        // top-left  corner
        if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
            obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
            obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left);
        }
        // bot-right corner
        if (obj.getBoundingRect().top + obj.getBoundingRect().height > obj.canvas.height || obj.getBoundingRect().left + obj.getBoundingRect().width > obj.canvas.width) {
            obj.top = Math.min(obj.top, obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top);
            obj.left = Math.min(obj.left, obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left);
        }

        //snap to grid
        if (Math.round(event.target.left / grid * 4) % 4 == 0 && Math.round(event.target.top / grid * 4) % 4 == 0) {
            event.target.set({
                left: Math.round(event.target.left / grid) * grid,
                top: Math.round(event.target.top / grid) * grid
            }).setCoords();
        }
    });

    canvas.on('object:selected', function (event) {
        console.log("sel");
        console.log(event.target);
        $('#text-font-size').val(event.target.fontSize);
        if (event.target.text) {
            $('#text-color').spectrum("set", event.target.fill);
            $('#text-bg-color').spectrum("set", event.target.textBackgroundColor);
            $('#text-stroke-color').spectrum("set", event.target.stroke)
        }
        $('#text-cmd-underline').prop("checked", event.target.underline);
        $('#text-cmd-overline').prop("checked", event.target.overline);
        $('#text-cmd-linethrough').prop("checked", event.target.linethrough);
        $('#text-stroke-width').val(event.target.strokeWidth);
        $('#text-line-height').val(event.target.lineHeight);
        $('#font-family').val(event.target.fontFamily);

        if (event.target.fontWeight == "bold") {
            $('#text-cmd-bold').prop("checked", true);
        } else {
            $('#text-cmd-bold').prop("checked", false);
        }

        if (event.target.fontStyle == "italic") {
            $('#text-cmd-italic').prop("checked", true);
        } else {
            $('#text-cmd-italic').prop("checked", false);
        }

        if (event.target) {
            $("#text-font-size").val(event.target.fontSize);
        }
    });

    canvas.on('selection:updated', function (event) {
        console.log("update");
        $('#text-font-size').val(event.target.fontSize);
        if (event.target.text) {
            $('#text-color').spectrum("set", event.target.fill);
            $('#text-bg-color').spectrum("set", event.target.textBackgroundColor);
            $('#text-stroke-color').spectrum("set", event.target.stroke);
        }
        $('#text-cmd-underline').prop("checked", event.target.underline);
        $('#text-cmd-overline').prop("checked", event.target.overline);
        $('#text-cmd-linethrough').prop("checked", event.target.linethrough);
        $('#text-stroke-width').val(event.target.strokeWidth);
        $('#text-line-height').val(event.target.lineHeight);
        $('#font-family').val(event.target.fontFamily);

        if (event.target.fontWeight == "bold") {
            $('#text-cmd-bold').prop("checked", true);
        } else {
            $('#text-cmd-bold').prop("checked", false);
        }

        if (event.target.fontStyle == "italic") {
            $('#text-cmd-italic').prop("checked", true);
        } else {
            $('#text-cmd-italic').prop("checked", false);
        }
    });

    /** Add Grid */
    $("#gridBtn").click(function () {
        if ($('#gridBtn').text() == "gridOn") {
            $('#gridBtn').removeClass('grid-on');
            $('#gridBtn').addClass('grid-off');
            $('#gridBtn').text("gridOff");
            for (var i = 0; i < (500 / grid); i++) {
                canvas.add(new fabric.Line([i * grid, 0, i * grid, 500], {
                    stroke: '#ccc',
                    selectable: false
                }));
                canvas.add(new fabric.Line([0, i * grid, 500, i * grid], {
                    stroke: '#ccc',
                    selectable: false
                }))
            }
        } else if ($('#gridBtn').text() == "gridOff") {
            $('#gridBtn').removeClass('grid-off');
            $('#gridBtn').addClass('grid-on');
            $('#gridBtn').text("gridOn");
            var objects = canvas.getObjects('line');
            for (let i in objects) {
                canvas.remove(objects[i]);
            }
        }
    });


    /** Save Canvas to Png */
    $('#save').on("click", function () {
        if ($('#gridBtn').text() == "gridOff") {
            $('#gridBtn').removeClass('grid-off');
            $('#gridBtn').addClass('grid-on');
            $('#gridBtn').text("gridOn");
            var objects = canvas.getObjects('line');
            for (let i in objects) {
                canvas.remove(objects[i]);
            }
        }
        canvas.renderAll();
        this.href = canvas.toDataURL({
            format: 'png',
            multiplier: 4,
        });

        const link = document.createElement('a');
        link.download = 'image.png';
        //link.href = 'data:image/svg+xml;utf8,' + canvas.toSVG();
        link.href = this.href;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        /** Create Json */
        var svg = canvas.toSVG();
        var jsonData = JSON.stringify(canvas);
        console.log(jsonData);
        console.log(svg);
        $.ajax({
            url: "/createBusinessCard",
            data: { jsonData: jsonData },
            method: "POST",
            dataType: "text",
            success: function (data) {
                alert("success");
            },
            error: function (request, status, error) {
                alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
            }
        });
    });

    /** Canvas Resizing*/
    $('#size_modify').on("click", function () {
        if (confirm("サイズ変更時、内容は初期化されます。よろしいですか。") === true) {
            if (canvas.getHeight() == 300) {
                canvas.clear();
                canvas.setHeight(450);
                canvas.setWidth(300);
                canvas.calcOffset();
                $('#size_modify').text("よこ");
                $('#size_modify').addClass("yokotxt");
                $('.canvas-container').removeClass('yoko');
                $('.canvas-container').addClass('tate');
            } else if (canvas.getHeight() == 450) {
                canvas.clear();
                canvas.setHeight(300);
                canvas.setWidth(450);
                canvas.calcOffset();
                $('#size_modify').text("たて");
                $('#size_modify').removeClass("yokotxt");
                $('.canvas-container').removeClass('tate');
                $('.canvas-container').addClass('yoko');
            }
        }
    });

    /** Load Templet */
    $('#load').on("click", function () {
        $.ajax({
            url: "/selectBusinessCard",
            data: { idx: 1 },
            method: "POST",
            dataType: "text",
            success: function (data) {

                canvas.clear();
                canvas.loadFromJSON(data, function () {
                    canvas.renderAll();
                });
            },
            error: function (request, status, error) {
                alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
            }
        });
    });


    /** Delete Object */
    $('html').keyup(function (event) {
        if (event.keyCode == 46) {
            var obj = canvas.getActiveObject();
            if (!obj.isEditing) {
                deleteSelectedObjectsFromCanvas();
            }
        }
    });

    function deleteSelectedObjectsFromCanvas() {
        var selection = canvas.getActiveObject();
        if (selection.type === 'activeSelection') {
            selection.forEachObject(function (element) {
                console.log(element);
                canvas.remove(element);
            });
        }
        else {
            canvas.remove(selection);
        }
        canvas.discardActiveObject();
        canvas.requestRenderAll();
    }

    /** add image */
    document.getElementById('imgFile').addEventListener("change", function (event) {
        var fileType = event.target.files[0].type;
        var url = URL.createObjectURL(event.target.files[0]);

        switch (fileType) {
            case 'image/png':
                fabric.Image.fromURL(url, (img) => {
                    img.objectCaching = false;
                    if (img.width > canvas.getWidth() || img.hieght > canvas.getHeight()) {
                        img.scaleToWidth(img.width * 0.4);
                        img.scaleToHeight(img.height * 0.4);
                    }
                    canvas.add(img);
                });
                break;

            case 'image/jpeg':
                fabric.Image.fromURL(url, (img) => {
                    img.objectCaching = false;
                    if (img.width > canvas.getWidth() || img.hieght > canvas.getHeight()) {
                        img.scaleToWidth(img.width * 0.4);
                        img.scaleToHeight(img.height * 0.4);
                    }
                    canvas.add(img);
                });
                break;

            case 'image/svg+xml':
                fabric.loadSVGFromURL(url, function (objects, options) {
                    canvas.add.apply(canvas, objects);
                    canvas.renderAll();
                });
                break;
        }
    })

    /** Add Background */
    document.getElementById('bgFile').addEventListener("change", function (event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function (f) {
            var data = f.target.result;
            fabric.Image.fromURL(data, function (img) {
                // add background image
                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                    scaleX: canvas.width / img.width,
                    scaleY: canvas.height / img.height
                });
            });
        };
        reader.readAsDataURL(file);
    });

    var previousColor;
    var isCancel = false;
    $("#text-color").spectrum({
        preferredFormat: "hex",
        allowEmpty: true,
        showInitial: true,
        showInput: true,
        clickoutFiresChange: false,
        //기존 색
        show: function (color) {
            console.log("show");
            isCancel = false;
            previousColor = color;
            console.log(previousColor);
        },
        // 움직일때
        move: function (color) {
            console.log("move");
            canvas.getActiveObject().set('fill', color);
            canvas.renderAll();
        },
        change: function (color) {
            console.log("change");
            isCancel = true;
            canvas.getActiveObject().set('fill', color);
            canvas.renderAll();
            console.log(isCancel);

        },
        hide: function (color) {
            console.log("hide");
            if (!isCancel && previousColor) {
                isCancel = true;
                canvas.getActiveObject().set('fill', previousColor)
                canvas.renderAll();
            }
        }
    });

    $("#text-bg-color").spectrum({
        preferredFormat: "hex",
        allowEmpty: true,
        showInitial: true,
        showInput: true,
        clickoutFiresChange: false,
        //기존 색
        show: function (color) {
            console.log("show");
            isCancel = false;
            previousColor = color;
            console.log(previousColor.toHexString());
        },
        move: function (color) {
            canvas.getActiveObject().set('textBackgroundColor', color);
            canvas.renderAll();
        },
        change: function (color) {
            isCancel = true;
            canvas.getActiveObject().set('textBackgroundColor', color);
            canvas.renderAll();
        },
        hide: function (color) {
            if (!isCancel && previousColor) {
                isCancel = true;
                console.log(previousColor.toHexString());
                if (previousColor.toHexString() == "#000000") {
                    previousColor = "";
                }
                canvas.getActiveObject().set('textBackgroundColor', previousColor);
                canvas.renderAll();
            }
        }
    });

    $("#text-stroke-color").spectrum({
        preferredFormat: "hex",
        allowEmpty: true,
        showInitial: true,
        showInput: true,
        clickoutFiresChange: false,

        show: function (color) {
            isCancel = false;
            previousColor = color;
        },
        move: function (color) {
            canvas.getActiveObject().set('stroke', color);
            canvas.renderAll();
        },
        change: function (color) {
            if (canvas.getActiveObject == null) {
                isCancel = true;
                canvas.getActiveObject().set('stroke', color);
                canvas.renderAll();
            }
        },
        hide: function (color) {
            if (!isCancel && previousColor) {
                isCancel = true;
                canvas.getActiveObject().set('stroke', previousColor)
                canvas.renderAll();
            }
        }
    });


    /** Add Property */
    addHandler('font-family', function (obj) {
        setStyle(obj, 'fontFamily', this.value);
    }, 'onchange');

    addHandler('text-stroke-width', function (obj) {
        setStyle(obj, 'strokeWidth', this.value);
    }, 'onchange');

    addHandler('text-font-size', function (obj) {
        setStyle(obj, 'fontSize', this.value);
    }, 'onchange');

    addHandler('text-line-height', function (obj) {
        setStyle(obj, 'lineHeight', this.value);
    }, 'onchange');

    addHandler('text-cmd-bold', function (obj) {
        if (obj.fontWeight == 'bold') {
            setStyle(obj, 'fontWeight', 'normal');
        } else {
            setStyle(obj, 'fontWeight', this.value);
        }
    }, 'onchange');

    addHandler('text-cmd-italic', function (obj) {
        if (obj.fontStyle == 'italic') {
            setStyle(obj, 'fontStyle', 'normal');
        } else {
            setStyle(obj, 'fontStyle', this.value);
        }
    }, 'onchange');

    addHandler('text-cmd-underline', function (obj) {
        var isUnderline = (getStyle(obj, 'underline') || false);
        setStyle(obj, 'underline', isUnderline ? false : true);
        obj.dirty = true;
    });

    addHandler('text-cmd-linethrough', function (obj) {
        var islinethrough = (getStyle(obj, 'linethrough') || false);
        setStyle(obj, 'linethrough', islinethrough ? false : true);
        obj.dirty = true;
    });

    addHandler('text-cmd-overline', function (obj) {
        var isoverline = (getStyle(obj, 'overline') || false);
        setStyle(obj, 'overline', isoverline ? false : true);
        obj.dirty = true;
    });

    function setStyle(object, styleName, value) {
        if (object.setSelectionStyles && object.isEditing) {
            var style = {};
            style[styleName] = value;
            object.setSelectionStyles(style);
        }
        else {
            object[styleName] = value;
        }
    }
    function getStyle(object, styleName) {
        return (object.getSelectionStyles && object.isEditing)
            ? object.getSelectionStyles()[styleName]
            : object[styleName];
    }
    function addHandler(id, fn, eventName) {
        document.getElementById(id)[eventName || "onclick"] = function () {
            var el = this;
            //alert(this.value);
            if (obj = canvas.getActiveObject()) {
                fn.call(el, obj);
                canvas.renderAll();
            }
        };
    }
});