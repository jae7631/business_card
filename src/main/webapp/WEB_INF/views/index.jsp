<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
            integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
            crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
            integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
            crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
            integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV"
            crossorigin="anonymous"></script>
    <title>Main</title>
  </head>
  <body>
    <!--page wrapper-->
    <div id="wrapper">
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
                <!-- main content-->                   
                <div class="row my-1">
                    <!-- left Side-->
                    <div class="col-sm-6">
                        <!-- namecardView Section-->
                        <div class="card shadow mb-2 text-left" style="max-width:40rem; margin: 2vh auto auto;">
                            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 class="m-0 font-weight-bold text-primary">名刺</h6>
                            </div>
                            <div class="card-body">
                                <div class="design-area">
                                    <canvas id="canvas-area" style="height:320px"></canvas>
                                </div>
                            </div>
                        </div>
                        <!-- //namecardView Section-->

                        <!-- property Section-->
                        <div class="card shadow mb-2 text-left" style="max-width:40rem; margin: 2vh auto auto;">
                            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 class="m-0 font-weight-bold text-primary">名刺情報</h6>
                            </div>
                            <div class="card-body">
                                <div class="container-fluid">
                                    <div class="row my-1 py-2 align-items-center">
                                        <div class="col-sm-3 tester"><label for="input-x" class="control-label">X</label></div>
                                        <div class="col-sm-3"><input type="text" class="form-control form-control-sm" id="input-x" placeholder="X"></div>
                                        <div class="col-sm-3"><label for="input-y">Y</label></div>
                                        <div class="col-sm-3"><input type="text" class="form-control form-control-sm" id="input-y" placeholder="Y"></div>
                                    </div>
                                    <div class="row my-1 py-2">
                                        <div class="col-sm-3"><label for="input-fontSize">Font Size</label></div>
                                        <div class="col-sm-3"><input type="text" class="form-control form-control-sm" id="input-fontSize" placeholder="FontSize"></div>
                                        <div class="col-sm-3"><label for="input-fontWeight">Font Weight</label></div>
                                        <div class="col-sm-3">
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="checkbox-1" name="checkbox-1" autocomplete="off" value="Bold">
                                                <label for="checkbox-1" class="custom-control-label">Bold</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row my-1 py-2">
                                        <div class="col-sm-3"><label for="input-fontStyle">Font Style</label></div>
                                        <div class="col-sm-4">
                                            <div class="custom-control custom-radio">
                                                <input type="radio" autocomplete="off" class="custom-control-input" value="normal" id="fontStyleNormal">
                                                <label for="fontStyleNormal" class="custom-control-label">Normal</label>
                                            </div>
                                        
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="custom-control custom-radio">
                                                <input type="radio" autocomplete="off" class="custom-control-input" value="italic" id="fontStyleItalic">
                                                <label for="fontStyleItalic" class="custom-control-label">Italic</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row my-1 py-2">
                                        <div class="col-sm-3">
                                            <label for="input-font">Font</label>
                                        </div>
                                        <div class="col-sm-9">
                                            <select class="mb-3 custom-select" id="selectFont">
                                                <option selected="selected" value=""></option>
                                                <option value="Kosugi, sans-serif" style="font-family: Kosugi, sans-serif;">Kosugi</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row my-1 py-2">
                                        <div class="col-sm-3"><label for="input-color">Color</label></div>
                                        <div class="col-sm-3"><input type="color" style="width:85%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <!-- //property Section-->
                    </div>
                    <!-- //left Side-->
                    
                    <!-- right Side-->
                    <div class="col-sm-6">
                        <!-- input Section-->
                        <div class="card shadow mb-2 text-left" style="max-width:40rem; margin: 2vh auto auto;">
                            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 class="m-0 font-weight-bold text-primary">情報入力</h6>
                            </div>
                            <div class="card-body">
                                <div class="container-fluid">
                                    <form>
                                        <div class="row my-1 py-2">
                                            <div class="col-sm-3"><label for="input-name1">お名前</label></div>
                                            <div class="col-sm-4"><input type="text" class="form-control form-control-sm" id="input-name1" placeholder="山田"></div>
                                            <div class="col-sm-4"><input type="text" class="form-control form-control-sm" id="input-name2" placeholder="太郎"></div>
                                        </div>
                                        <div class="row my-1 py-2">
                                            <div class="col-sm-3"><label for="input-name3">カタカナ</label></div>
                                            <div class="col-sm-4"><input type="text" class="form-control form-control-sm" id="input-name3" placeholder="ヤマダ"></div>
                                            <div class="col-sm-4"><input type="text" class="form-control form-control-sm" id="input-name4" placeholder="タロウ"></div>
                                        </div>
                                        <div class="row my-1 py-2">
                                            <div class="col-sm-3"><label for="input-company">会社名</label></div>
                                            <div class="col-sm-9"><input type="text" class="form-control form-control-sm" id="input-company" placeholder="インフォシア・テク"></div>
                                        </div>
                                        <div class="row my-1 py-2">
                                            <div class="col-sm-3"><label for="input-affiliation">所属</label></div>
                                            <div class="col-sm-9"><input type="text" class="form-control form-control-sm" id="input-affiliation" placeholder="開発１課"></div>
                                        </div>
                                        <div class="row my-1 py-2">
                                            <div class="col-sm-3"><label for="input-position">職位</label></div>
                                            <div class="col-sm-9"><input type="text" class="form-control form-control-sm" id="input-position" placeholder="社員"></div>
                                        </div>
                                        <div class="row my-1 py-2">
                                            <div class="col-sm-3"><label for="input-postcode">郵便番号</label></div>
                                            <div class="col-sm-9"><input type="text" class="form-control form-control-sm" id="input-postcode" placeholder="1234567"></div>
                                        </div>
                                        <div class="row my-1 py-2">
                                            <div class="col-sm-3"><label for="input-address1">住所</label></div>
                                            <div class="col-sm-9"><input type="text" class="form-control form-control-sm" id="input-address1" placeholder="大阪府大阪市北区南扇町2-4"></div>
                                        </div>
                                        <div class="row my-1 py-2">
                                            <div class="col-sm-3"><label for="input-address2">詳細住所</label></div>
                                            <div class="col-sm-9"><input type="text" class="form-control form-control-sm" id="input-address2" placeholder="東辰ビル2F"></div>
                                        </div>
                                        <div class="row my-1 py-2">
                                            <div class="col-sm-3"><label for="input-phone">TEL</label></div>
                                            <div class="col-sm-9"><input type="text" class="form-control form-control-sm" id="input-phone" placeholder="090-1234-5678"></div>
                                        </div>
                                        <div class="row my-1 py-2">
                                            <div class="col-sm-3"><label for="input-fax">FAX</label></div>
                                            <div class="col-sm-9"><input type="text" class="form-control form-control-sm" id="input-fax" placeholder="06-1234-5678"></div>
                                        </div>
                                        <div class="row my-1 py-2">
                                            <div class="col-sm-3"><label for="input-email">E-Mail</label></div>
                                            <div class="col-sm-9"><input type="text" class="form-control form-control-sm" id="input-email" placeholder="user@infosiatec.com"></div>
                                        </div>
                                        <div class="row my-1 py-2">
                                            <div class="col-sm-3"><label for="input-homepage">ホーム</label></div>
                                            <div class="col-sm-9"><input type="text" class="form-control form-control-sm" id="input-homepage" placeholder="http://www.infosiatec.com"></div>
                                        </div>
                                        <div class="row my-1 py-2" role="group">
                                            <div class="col-sm-3"><button class="btn btn-outline-primary btn-block">Grid追加</button></div>
                                            <div class="col-sm-3"><button class="btn btn-outline-primary btn-block">grid削除</button></div>
                                            <div class="col-sm-3"><button class="btn btn-outline-primary btn-block" onclick="return save();">保存</button></div>
                                            <div class="col-sm-3"><input type="reset" class="btn btn-outline-primary btn-block" value="リセット" onclick="return confirmReset();"></div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <!-- //input Section-->
                    </div>
                    <!-- //right Side-->
                </div>
                <!-- //main content-->
            </div>
            <!-- //container-->

        </div>
        <!-- //content wrapper--> 
    </div>
    <!-- //page wrapper-->
  </body>
  <script>
      function save(){
          if(confirm("保存しますか?")){
              return true;
          }else{
              return false;
          }
      }

      function confirmReset(){
        return confirm("入力データをリセットしますか？");
      }
  </script>
</html>