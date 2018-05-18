<template>
    <div class="wishEditContainer">
        <img src="static/img/addImg.png" alt="" class="upload" accept="image/x-png,image/gif,image/jpeg,image/bmp" @click='emitUploadImg' ref='uploadIcon'>
        <input type="file" class="uploadFile" ref='uploadFile' @change='uploadImg($event)'>
        <textarea name="wishtext" id="" cols="15" rows="8" class="wishtext" placeholder="输入愿望文字" maxlength='120' @input='changeTextLength($event)' ref='wishTextArea'></textarea>
        <p class="textLength" ref='textLength'>120</p>
        <div class="wishtype">
            愿望类型
        </div>
        <div class="somethingType" @click='changeWishType(0)'>
            <img :src="wishType == 0 ? 'static/img/something_click.png' : 'static/img/something.png'" alt="">
            <p>实物类</p>
        </div>
        <div class="middleLine">
            <img src="static/img/line.png" alt="">
        </div>
        <div class="timeType" @click='changeWishType(1)'>
            <img :src="wishType == 1 ? 'static/img/time_click.png' : 'static/img/time.png'" alt="">
            <p>耗时类</p>
        </div>
        <div class="wish-per-mes">
            个人信息
        </div>
        <div class="wish-user-mes">
            <span class="wish-user-name">{{userName}}</span><!--
            --><span class="wish-user-sex">{{sex}}</span>
            <!-- <img src="static/img/set.png" alt="" class="set"> -->
        </div>
        <div class="footer-space"></div>
        <footer class="wish-footer" @click='pubWish'>
            <h1 class="pub">发布</h1>
        </footer>
    </div>
</template>

<script>
    let http = require('../../axios');
    module.exports = {
        data() {
            return {
                wishType: 0,
                userName: sessionStorage.userName,
                sex: sessionStorage.sex == 1 ? '女' : '男'
            }
        },
        props: ['host'],
        methods: {
            changeWishType: function(type) {
                this.wishType = type;
            },
            emitUploadImg: function() {
                this.$refs.uploadFile.click();
            },
            uploadImg: function(e) {
                var file = e.target.files[0];
                var reader = new FileReader(); //上传图片预览，HTML5  api
                reader.readAsDataURL(file);
                var img = this.$refs.uploadIcon;
                reader.onload = function(e) {
                    img.src = this.result;
                };
            },
            changeTextLength: function(e) {
                this.$refs.textLength.innerHTML = 120 - e.target.value.length;
            },
            pubWish: function() {
                var file = this.$refs.uploadFile.files[0];
                var data = new FormData();
                data.append('userId', sessionStorage.userId);
                file && data.append('wishImg', file);
                data.append('wishText', this.$refs.wishTextArea.value);
                data.append('wishType', this.wishType);
                http('post', this.host + 'pubWish', data, 'json', (res) => {
                    if(res.data.code == 1) {
                        this.$router.push({
                            name: 'wishHome'
                        })
                    }
                }, (err) => {
                    console.log(err);
                })
            }
        }
    }
</script>

<style lang='less' scoped>
    .wishEditContainer {
        background: #f0f0f0;
        .upload {
            width: 2.5rem;
            min-height: 2.5rem;
            max-height: 5rem;
            vertical-align: top;
            margin: 0.5rem 1rem;
        }
        .uploadFile {
            display: none;
        }
        .wishtext::-webkit-input-placeholder {
            line-height: 1;
        }
        .wishtext::input-placeholder {
            line-height: 1;
        }
        .wishtext {
            width: 45%;
            margin-top: 0.5rem;
            border: 0;
            resize: none;
            background-color: #f0f0f0;
            font-size: 0.4rem;
            height: 5rem;
        }
        .textLength {
            text-align: right;
            padding-right: 1rem;
            font-size: 0.5rem;
            color: #757575;
        }
        .somethingType, .middleLine, .timeType {
            float: left;
            color: #757575;
            margin-top: 0.7rem;
            width: 49%;
            text-align: center;
        }
        .middleLine {
            width: 2%;
        }
        .somethingType img, .timeType img{
            height: 0.7rem;
        }
        .middleLine img {
            width: 1px;
            height: 0.7rem;
        }

        .wishtype, .wish-per-mes {
            text-align: center;
            font-size: 0.4rem;
            box-shadow: 1px 1px 5px 1px #9c9c9c;
            background-color: #fff;
            height: 1rem;
            line-height: 1rem;
            margin-top: 0.3rem;
            color: #757575;
            clear: both;
        }
        .wish-per-mes {
            margin-top: 2.5rem;
        }
        .wish-user-mes {
            position: relative;
            padding-top: 0.5rem;
            text-align: center;
        }
        .wish-user-mes span {
            display: inline-block;
            margin-top: 0.5rem;
            width: 45%;
            font-size: 0.4rem;
        }
        .wish-user-mes .set {
            position: absolute;
            width: 0.5rem;
            height: 0.5rem;
            top: 0.4rem;
            right: 0.4rem;
        }
        .wish-user-name, .wish-user-class {
            margin-right: 2.5%;
            text-align: right;
        }
        .wish-user-sex, .wish-user-tel {
            margin-left: 2.5%;
            text-align: left;
        }

        .wish-footer {
            position: fixed;
            width: 100%;
            max-width: 700px;
            font-size: 0.5rem;
            line-height: 1.4rem;
            height: 1.4rem;
            background-color: #ee76c2;
            text-align: center;
            color: #fff;
            z-index: 99;
            border: 0;
            padding: 0;
            bottom: 0;
        }
    }
</style>