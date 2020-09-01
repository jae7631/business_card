<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css">
    <script src="http://code.jquery.com/jquery-latest.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/3.6.3/fabric.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.js"></script>
	<script src="./js/main.js"></script>
    
    <title>Main</title>
    <style>
    .canvas-container {
        border:1px solid red;
        background: #FFF;
    }
    .yoko {
      position: relative;
        top:5em;
        left:0.8em;
        margin:0;
        padding:0;
        display: inline-block;
    }
    .tate {
      position: relative;
        top:0.2em;
        left:5.5em;
        margin:0;
        padding:0;
        display: inline-block;
    }
    </style>

</head>

<body>

    <!--content wrapper-->
    <div id="content-wrapper" class="d-flex flex-column">
      <!--header-->
      <nav class="navbar navbar-expand navbar-dark bg-dark topbar mb-4 static-top shadow">
        <ul class="navbar-nav">
          <li class="navbar-item"><a class="nav-link" href="#">Home</a></li>
          <li class="navbar-item"><a class="nav-link" href="#">List</a></li>
          <li class="navbar-item active"><a class="nav-link" href="#">Create</a></li>
          <li class="navbar-item"><a class="nav-link" href="#">ImageView</a></li>
        </ul>
      </nav>
      <!-- //header-->

      <!--container-->
      <div class="container">
        <!--Page header-->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 class="h3 mb-0 text-gray-800">Create Page</h1>
        </div>
        <!--//Page header-->

        <!-- row -->
        <div class="row my-1">
          <!-- main content-->
          <div class="col-sm-12">
            <!-- shadow-->
            <div class="card shadow mb-2 text-left" style="margin: 2vh auto auto;">
              <!-- main content Title-->
              <div class="card-header py-3 d-flex flex-row align-items-center justify-content-end">
				<div class="col-sm-2"><button class="btn btn-outline-primary btn-block" id="size_modify">たて</button></div>
                <div class="col-sm-2"><label class="btn btn-outline-primary btn-block" id="imageAdd" style="margin:0;">イメージ追加<input type="file" id="imgFile" hidden></label></div>
                <div class="col-sm-2"><label class="btn btn-outline-primary btn-block" id="bgAdd" style="margin:0;">背景追加<input type="file" id="bgFile" hidden></label></div>
                </div>
              <!-- //main content Title-->

              <!-- main content body-->
              <div class="row card-body">
                <!-- input Form-->

				 <!-- canvas Area-->
                <div class="col-sm-6">
                  <div class="card shadow mb-2 text-left" style="max-width:40rem; margin: 1vh auto auto;">
                    <div class="card-body" style="height: 500px; background: #f3f3f3;">
                        <canvas id="canvas-area"></canvas>
                    </div>
                  </div>
                </div>
                <!-- //canvas Area-->

                <!-- canvas attribute Area-->
                <div class="col-sm-6">
                  <div class="card shadow mb-2 text-left" style="max-width:40rem; margin: 1vh auto auto;">
                    <div class="card-body" style="height: 500px;">
                      <div class="container-fluid">
                        <div class="row my-1 py-2"><button class="btn btn-outline-primary btn-block" id="test">テキスト追加</button></div>
                        <div class="row my-1 py-2">
                          <div class="col-sm-2"><label for="font-family">Font</label></div>
                          <div class="col-sm-4">
                             <select id="font-family" class="form-control">
                             	<option value="Times New Roman">Times New Roman</option>
                                <option value="arial">Arial</option>
                                <option value="helvetica" selected>Helvetica</option>
                                <option value="myriad pro">Myriad Pro</option>
                                <option value="delicious">Delicious</option>
                                <option value="verdana">Verdana</option>
                                <option value="georgia">Georgia</option>
                                <option value="courier">Courier</option>
                                <option value="comic sans ms">Comic Sans MS</option>
                                <option value="impact">Impact</option>
                                <option value="monaco">Monaco</option>
                                <option value="optima">Optima</option>
                                <option value="hoefler text">Hoefler Text</option>
                                <option value="plaster">Plaster</option>
                                <option value="engagement">Engagement</option>
                                <option value="sans-serif">sans-serif</option>
                                <option value="serif">serif</option>
                                <option value="cursive">cursive</option>
                                <option value="fantasy">fantasy</option>
                                <option value="monospace">monospace</option>
                                <option value="HiraginoSans-W0">HiraginoSans-W0</option>
                                <option value="Hiragino Sans">Hiragino Sans</option>
                                <option value="Hiragino Maru Gothic ProN">Hiragino Maru Gothic ProN</option>
                                <option value="YuGothic">YuGothic</option>
                                <option value="YuMincho">YuMincho</option>
                                <option value="YuKyokasho">YuKyokasho</option>
                                <option value="YuKyokasho Yoko">YuKyokasho Yoko</option>
                                <option value="Klee">Klee</option>
                                <option value="Tsukushi A Round Gothic">Tsukushi A Round Gothic</option>
                                <option value="Tsukushi B Round Gothic">Tsukushi B Round Gothic</option>
                                <option value="Toppan Bunkyu Gothic">Toppan Bunkyu Gothic</option>
                                <option value="Toppan Bunkyu Midashi Gothic">Toppan Bunkyu Midashi Gothic</option>
                                <option value="Toppan Bunkyu Mincho">Toppan Bunkyu Mincho</option>
                                <option value="Toppan Bunkyu Midashi Mincho">Toppan Bunkyu Midashi Mincho</option>
                                <option value="Meiryo">Meiryo</option>
                                <option value="Meiryo UI">Meiryo UI</option>
                                <option value="Yu Gothic">Yu Gothic</option>
                                <option value="Yu Mincho">Yu Mincho</option>
                                <option value="BIZ UDPGothic">BIZ UDPGothic</option>
                                <option value="BIZ UDGothic">BIZ UDGothic</option>
                                <option value="BIZ UDPMincho">BIZ UDPMincho</option>
                                <option value="UD Digi Kyokasho N-R">UD Digi Kyokasho N-R</option>
                                <option value="UD Digi Kyokasho N-B">UD Digi Kyokasho N-B</option>
                                <option value="UD Digi Kyokasho NP-R">UD Digi Kyokasho NP-R</option>
                                <option value="UD Digi Kyokasho NP-B">UD Digi Kyokasho NP-B</option>
                                <option value="UD Digi Kyokasho NK-R">UD Digi Kyokasho NK-R</option>
                                <option value="UD Digi Kyokasho NK-B">UD Digi Kyokasho NK-B</option>
                                <option value="MS UI Gothic">MS UI Gothic</option>
                                <option value="MS PGothic">MS PGothic</option>
                                <option value="MS Gothic">MS Gothic</option>
                                <option value="MS PMincho">MS PMincho</option>
                                <option value="MS Mincho">MS Mincho</option>
                            </select>      
                        </div>
                        <div class="col-sm-3"><label for="text-font-size">Font size:</label></div>
                        <div class="col-sm-3"><input type="range" min="1" max="120" step="1" id="text-font-size" class="form-control-range"></div>
                        </div>
                        <div class="row my-1 py-2">
                          <div class="col-sm-3"><label for="text-color">文字色</label></div>
                          <div class="col-sm-3">
                            <input id="text-color" class="form-control form-control-sm" type="color">
						</div>
						
                          <div class="col-sm-3"><label for="text-bg-color">背景色</label></div>
                        	<div class="col-sm-3"><input type="color" class="form-control form-control-sm" id="text-bg-color"></div>
                        </div>

                        <div class="row my-1 py-2">
                            <div class="col-sm-3"><label for="text-stroke-width">Stroke width</label></div>
                            <div class="col-sm-3"><input type="range" class="form-control-range" id="text-stroke-width" value="1" min="1" max="5"></div>
                            <div class="col-sm-3"><label for="text-stroke-color">Stroke color</label></div>
                            <div class="col-sm-3"><input type="color" class="form-control form-control-sm" id="text-stroke-color"></div>
                        </div>
                          
                        <div class="row my-1 py-2">
                          <div class="col-sm-3"><label for="text-line-height">Line height</label></div>
                          <div class="col-sm-9"><input type="range" value="" min="0" max="10" step="0.1" id="text-line-height"></div>
                        </div>
                        <div class="row my-1 py-2">
                          <div class="col-sm-1"><label for="text-cmd-bold">Bold</label></div>
                          <div class="col-sm-3"><input type="checkbox" class="form-control-checkbox" id="text-cmd-bold" name="fontType" value="bold"></div>

                          <div class="col-sm-1"><label for="text-cmd-italic">Italic</label></div>
                          <div class="col-sm-1"><input type="checkbox" class="form-control-checkbox" id="text-cmd-italic" name="fontType" value="italic"></div>
                        </div>
                        
                        <div class="row my-1 py2">
                          <div class="col-sm-2"><label for="text-cmd-underline">Underline</label></div>
                          <div class="col-sm-2"><input type="checkbox" class="form-control-checkbox" id="text-cmd-underline" name="u" value="underline"></div>

                          <div class="col-sm-3"><label for="text-cmd-linethrough">LineThrough</label></div>
                          <div class="col-sm-1"><input type="checkbox" class="form-control-checkbox" id="text-cmd-linethrough" name="fontType" value="linethrough"></div>
                        
                          <div class="col-sm-2"><label for="text-cmd-overline">overLine</label></div>
                          <div class="col-sm-1"><input type="checkbox" class="form-control-checkbox" id="text-cmd-overline" name="fontType" value="overline"></div>
                        </div>
                        
                        <div class="row my-1 py-2" role="group">
                            <div class="col-sm-4"><button class="btn btn-outline-primary btn-block">gridOn</button>
                          </div>
                            <div class="col-sm-4"><button class="btn btn-outline-primary btn-block" id="load">load</button></div>
                            <div class="col-sm-4"><button class="btn btn-outline-primary btn-block" id="save">保存</button></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- //canvas attribute Area-->
              </div>
              <!-- //main content body-->
            </div>
            <!-- //shadow-->
          </div>
          <!-- //main content-->
        </div>
        <!-- //row-->
      </div>
      <!-- //container-->
    </div>
    <!-- //content wrapper-->


</body>
</html>