<template>
    <div class="friendDyContent" @click='cancelOther'>
        <div class="headerImg">
            <img src="https://images.pexels.com/photos/1019771/pexels-photo-1019771.jpeg?auto=compress&cs=tinysrgb&h=1334&w=750" alt="" />
        </div>
        <div class="userMes">
            <div class="userName">{{userName}}</div>
            <div class="head" :class='{initHead: initHead}'>
                <img :src="head" alt="" />
            </div>
        </div>
        <div class="friendDyList">
            <div class="friendDyItem" v-for='(item, index) in friendDyList'>
                <div class="left">
                    <img :src="item.user|getUserHead" alt="" />
                </div>
                <div class="right">
                    <div class="userName">{{item.user.userName}}</div>
                    <div class="text">{{item.mes}}</div>
                    <div class="imgList">
                        <div class="imgItem" v-for='img in item.imgList' :class='{multipleImg: item.imgList.length > 1}'>
                            <img :src="img" alt="" />
                        </div>
                    </div>
                    <div class="time">
                        {{item.date|formatDate}}
                        <div class="popUpComment" @click='toggleFavourAndComment(index)'>
                            <i class="icon-pop-up-comment"></i>
                        </div>
                        <div class="favourAndComment" :class='{hideFavourAndComment: item.hideFavourAndComment}'>
                            <div class="favour" :class='item.favour|isFavour' @click.stop='favour(item, index)'>
                                <i class="icon-favour"></i><span>{{item.favour|isFavourText}}</span>
                            </div>
                            <div class="comment" @click.stop='toggleCommentInput(item, index)'>
                                <i class="icon-comment"></i><span>评论</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="favourList" v-if='item.favour.length > 0'>
                    <div class="leftIcon">
                        <i class="icon-favour"></i>
                    </div>
                    <div class="rightList">
                        <div v-for='favourItem in item.favour' class='favourItem'>
                            <img class='favourItemHead' :src="favourItem.user|getUserHead" alt="" />
                        </div>
                    </div>
                </div>
                <div class="commentList" v-if='item.comment.length > 0'>
                    <div v-for='commentItem in item.comment' class='commentItem'>
                        <div class="commentItemName">{{commentItem.user.userName}}</div>
                        <div>:</div>
                        <div class="commentItemMes">{{commentItem.mes}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="editFriendDy" :class='{showEditFriendDy: showEditFriendDy}'>
            <input ref='uploadImg' class='uploadInput' type="file" multiple accept="image/jpeg,image/jpg,image/png"/>
            <textarea cols="30" rows="10" class='editFriendDyMes' placeholder='这一刻的想法...' ref='friendDyMes'></textarea>
            <div class="editFriendDyImgList">
                <div class="imgItem" v-for='(item, index) in editFriendDyImgList' @click='delImg(index)'>
                    <img :src="item" alt="" />
                </div>
                <div v-show='editFriendDyImgList.length<9' class="addImgList" @click='uploadImg'>
                    <i class="icon-uploadImg"></i>
                </div>
            </div>
            <div class="editFriendBtn">
                <div class="push ui-btn-lg ui-btn-primary" @click='pushFriendDy'>发表</div>
                <div class="cancel ui-btn-lg" @click='cancelEditFD'>返回</div>
            </div>
        </div>
        <div class="commentInput" v-if='showCommentInput' @click.stop>
            <input type="text" ref='commentText'/>
            <button class="pushComment ui-btn ui-btn-primary" @click='pushComment'>发送</button>
        </div>
    </div>
</template>

<script>
    let common = require('../common.js');
    let http = require('../axios.js');
    module.exports = {
        props: ['host'],
        data() {
            return {
                initHead: sessionStorage.head == 'null',
                userName: sessionStorage.userName,
                head: '',
                showEditFriendDy: false,
                friendDyList: [],
                editFriendDyImgList: [],
                fileList: [],
                showCommentInput: false,
                comment: {}
            }
        },
        methods: {
            cancelOther() {
                this.showCommentInput = false;
            },
            toggleFavourAndComment(index) {
                let item = this.friendDyList[index];
                item.hideFavourAndComment = !item.hideFavourAndComment;
            },
            uploadImg() {
                this.$refs.uploadImg.click();
            },
            delImg(index) {
                this.editFriendDyImgList.splice(index, 1);
                this.fileList.splice(index, 1);
            },
            showEditFD() {
                this.showEditFriendDy = true;
            },
            cancelEditFD() {
                this.showEditFriendDy = false;
                this.$refs.friendDyMes.value = '';
                this.editFriendDyImgList = [];
                this.fileList = [];
            },
            pushFriendDy() {
                if(this.fileList.length == 0 && this.$refs.friendDyMes.value == '') {
                    return;
                }else {
                    let data = new FormData();
                    data.append('mes', this.$refs.friendDyMes.value);
                    this.fileList.forEach((value, index) => {
                        data.append('imgList', value);
                    })
                    http('post', this.host + 'pushFriendDy', data, 'json', (res) => {
                        this.cancelEditFD();
                        this.getFriendDy();
                    }, (err) => {
                        console.log(err);
                    })
                }
            },
            getFriendDy() {
                http('get', this.host + 'getFriendDy', {}, 'json', (res) => {
                    res.data.friendDynamicList.forEach((value, index) => {
                        value.hideFavourAndComment = true;
                    })
                    this.friendDyList = res.data.friendDynamicList
                }, (err) => {
                    console.log(err);
                })
            },
            ifIsFavour(friendDynamic) {
                let result = false;
                friendDynamic.favour.forEach((value, index) => {
                    if(value.user.userId == sessionStorage.userId) {
                        result = true;
                    }
                })
                return result;
            },
            favour(friendDynamic, index) {
                let api = '';
                if(this.ifIsFavour(friendDynamic)) {
                    api = 'unfavour';
                }else {
                    api = 'favour';
                }
                http('post', this.host + api, {
                    _id: friendDynamic._id
                }, 'json', (res) => {
                    if(res.data.code == 1) {
                        if(api == 'favour') {
                            this.friendDyList[index].favour.push({
                                user: {
                                    userId: sessionStorage.userId,
                                    head: sessionStorage.head,
                                    sex: sessionStorage.sex
                                }
                            })
                        }else {
                            this.friendDyList[index].favour.forEach((value, keyIndex) => {
                                if(value.user.userId == sessionStorage.userId) {
                                    this.friendDyList[index].favour.splice(keyIndex, 1);
                                }
                            })
                        }
                    }
                }, (err) => {
                    console.log(err);
                })
            },
            toggleCommentInput(friendDynamic, index) {
                this.showCommentInput = !this.showCommentInput;
                this.$nextTick(() => {
                    if(this.showCommentInput) {
                        this.$refs.commentText.focus();
                        this.comment.friendDynamic = friendDynamic;
                        this.comment.index = index;
                    }else {
                        this.comment = {};
                    }
                })
            },
            pushComment() {
                if(this.$refs.commentText.value == '') {
                    return;
                }else {
                    console.log(this.comment.friendDynamic)
                    http('post', this.host + 'pushComment', {
                        mes: this.$refs.commentText.value,
                        _id: this.comment.friendDynamic._id
                    }, 'json', (res) => {
                        this.friendDyList[this.comment.index].comment.push({
                            user: {
                                userName: sessionStorage.userName
                            },
                            mes: this.$refs.commentText.value
                        })
                        this.toggleCommentInput();
                    }, (err) => {
                        console.log(err)
                    })
                }
            }
        },
        filters: {
            getUserHead(user) {
                return common.getUserHead(user.head, user.sex);
            },
            formatDate(date) {
                let result = '';
                date = +new Date(date);
                let now = +new Date;
                seconds = (now - date) / 1000;
                minutes = seconds / 60;
                hours = minutes / 60;
                days = hours / 24;

                if(seconds < 60) {
                    result = '刚刚';
                }else if(minutes < 60) {
                    result = parseInt(minutes) + '分钟前';
                }else if(hours < 24) {
                    result = parseInt(hours) + '小时前';
                }else {
                    result = parseInt(days) + '天前';
                }
                return result;
            },
            isFavour(favourList) {
                let result = '';
                favourList.forEach((value, index) => {
                    if(value.user.userId == sessionStorage.userId) {
                        result = 'active';
                    }
                })
                return result;
            },
            isFavourText(favourList) {
                let result = '赞';
                favourList.forEach((value, index) => {
                    if(value.user.userId == sessionStorage.userId) {
                        result = '取消';
                    }
                })
                return result;
            }
        },
        created() {
            common.changeHeader({
                hasPerMes: false,
                hasReturn: true,
                hasEditFD: true,
                hasRefresh: true
            })
            common.bus.$on('showEditFD', this.showEditFD);
            common.bus.$on('refresh', this.getFriendDy);
            this.head = common.getUserHead(sessionStorage.head, sessionStorage.sex);

            this.getFriendDy();
        },
        mounted() {
            let uploadFile = this.$refs.uploadImg;
            uploadFile.onchange = () => {
                let files = uploadFile.files;
                let arr = Array.prototype.slice.call(files);
                arr.forEach((value, index) => {
                    let reader = new FileReader();
                    reader.onload = (e) => {
                        console.log(index)
                        this.editFriendDyImgList.push(e.target.result);
                        this.fileList.push(arr[index]);
                        //重置才能上传相同图片
                        uploadFile.value = '';
                    }
                    reader.readAsDataURL(arr[index]);
                })
            }
        },
        destroy() {
            common.bus.$off('showEditFD', this.showEditFD);
            common.bus.$off('refresh', this.getFriendDy);
        }
    }
</script>

<style lang='less' scoped>
    .friendDyContent {
        .headerImg {
            width: 100%;
            height: 8rem;
            overflow: hidden;
            position: relative;
            img {
                width: 100%;
                min-height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
            }
        }
        .userMes {
            position: relative;
            margin-top: -1.5rem;
            margin-bottom: .3rem;
            font-size: 0;
            z-index: 2;
            text-align: right;
            padding-right: .5rem;
            .userName {
                display: inline-block;
                vertical-align: top;
                font-size: .5rem;
                color: #fff;
                font-weight: bold;
                margin: .5rem .3rem 0 0;
                max-width: 3rem;
                overflow: hidden;
                white-space: nowrap;
            }
            .head {
                display: inline-block;
                vertical-align: top;
                position: relative;
                width: 2.5rem;
                height: 2.5rem;
                overflow: hidden;
                border: 1px solid rgba(0, 0, 0, .15);
                &.initHead {
                    border: 0;
                } 
                img {
                    position: absolute;
                    width: 100%;
                    min-height: 100%;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    margin: auto;
                }
            }
        }
        .friendDyList {
            box-sizing: border-box;
            .friendDyItem {
                font-size: 0;
                padding: 0 .4rem;
                border-bottom: 1px solid rgba(0, 0, 0, .2);
                margin-bottom: .4rem;
                .left {
                    position: relative;
                    display: inline-block;
                    vertical-align: top;
                    width: 1.5rem;
                    height: 1.5rem;
                    overflow: hidden;
                    img {
                        position: absolute;
                        width: 100%;
                        min-height: 100%;
                        top: 0;
                        left: 0;
                        bottom: 0;
                        right: 0;
                        margin: auto;
                    }
                }
                .right {
                    position: relative;
                    display: inline-block;
                    width: 7.7rem;
                    vertical-align: top;
                    box-sizing: border-box;
                    padding-left: .3rem;
                    .userName {
                        font-size: .5rem;
                        color: #187096;
                    }
                    .text {
                        font-size: .5rem;
                        line-height: 1.2;
                        margin: .1rem 0 .3rem;
                    }
                    .imgList {
                        overflow: hidden;
                        img {
                            max-width: 4rem;
                            max-height: 7rem;
                        }
                        .imgItem {
                            position: relative;
                            float: left;
                            &.multipleImg {
                                width: 2.3rem;
                                height: 2.3rem;
                                overflow: hidden;
                                margin: 0 .1rem .1rem 0;
                                img {
                                    position: absolute;
                                    width: 100%;
                                    top: 0;
                                    bottom: 0;
                                    left: 0;
                                    right: 0;
                                    margin: auto;
                                }
                            }   
                        }
                    }
                    .time {
                        position: relative;
                        font-size: .35rem;
                        color: #666;
                        padding: .5rem 0;
                        .popUpComment {
                            position: absolute;
                            font-size: .8rem;
                            top: .2rem;
                            right: 0;
                        }
                        .favourAndComment {
                            position: absolute;
                            width: 5rem;
                            height: 1.1rem;
                            background: #1f1919;
                            font-size: 0;
                            border-radius: 3px;
                            right: .9rem;
                            top: .3rem;
                            overflow: hidden;
                            transition: width .1s;
                            &.hideFavourAndComment {
                                width: 0;
                            }
                            & > div {
                                position: relative;
                                display: inline-block;
                                width: 2.5rem;
                                vertical-align: middle;
                                font-size: .5rem;
                                color: #fff;
                                font-weight: lighter;
                                text-align: center;
                                height: 100%;
                                line-height: 1rem;
                                i {
                                    font-weight: bold;
                                    vertical-align: middle;
                                    margin-right: .1rem;
                                }
                                span {
                                    font-size: .43rem;
                                    vertical-align: middle;
                                }
                            }
                            .favour {
                                &.active {
                                    i {
                                        color: red;
                                    }
                                }
                                i {
                                    font-size: .5rem;
                                }
                                &:after {
                                    content: '';
                                    position: absolute;
                                    display: block;
                                    width: 1px;
                                    height: .6rem;
                                    top: .2rem;
                                    right: 0;
                                    background: #000;
                                }
                            }
                            .comment {
                                i {
                                    font-size: .6rem;
                                }
                            }
                        }
                    }
                }
                .favourList {
                    position: relative;
                    background: #e5e5e5;
                    padding: .075rem 0;
                    margin-bottom: .3rem;
                    &:before {
                        content: '';
                        position: absolute;
                        display: block;
                        border: .2rem solid #e5e5e5;
                        border-top-color: transparent;
                        border-left: .3rem solid transparent;
                        border-right: .3rem solid transparent;
                        top: -.4rem;
                        left: .2rem;
                    }
                    & > div {
                        display: inline-block;
                    }
                    i {
                        &.icon-favour {
                            font-size: .4rem;
                            color: #2e3ba2;
                            font-weight: bold;
                        }
                    }
                    .leftIcon {
                        position: absolute;
                        top: .45rem;
                        margin: 0 .3rem;
                    }
                    .rightList {
                        width: 8.2rem;
                        padding-left: 1rem;
                        .favourItem {
                            position: relative;
                            display: inline-block;
                            width: 1rem;
                            height: 1rem;
                            overflow: hidden;
                            margin: .075rem .15rem .075rem 0;
                            .favourItemHead {
                                position: absolute;
                                width: 100%;
                                top: 0;
                                bottom: 0;
                                left: 0;
                                right: 0;
                                margin: auto;
                            }
                        }
                    }
                }
                .commentList {
                    position: relative;
                    box-sizing: border-box;
                    width: 100%;
                    padding: .2rem .3rem;
                    background: #e5e5e5;
                    margin: -.25rem 0 .3rem;
                    .commentItem {
                        & > div {
                            font-size: .5rem;
                            display: inline-block;
                        }
                        .commentItemName {
                            color: #2e3ba2;
                        }
                        .commentItemMes {
        
                        }
                    }
                }
            }
        }
        .editFriendDy {
            &.showEditFriendDy {
                left: 0;
            }
            position: fixed;
            width: 100%;
            min-height: 100%;
            background: #f8f8f8;
            left: 100%;
            top: 0;
            z-index: 999;
            padding: .4rem .5rem;
            box-sizing: border-box;
            transition: left .3s;
            .uploadInput {
                display: block;
                width: 0;
                height: 0;
                visibility: hidden;
            }
            .editFriendDyMes {
                width: 100%;
                height: 3rem;
                overflow: auto;
                background: transparent;
                font-size: .5rem;
            }
            .editFriendDyImgList {
                overflow: hidden;
                .addImgList {
                    float: left;
                    width: 2.5rem;
                    height: 2.5rem;
                    background: rgba(0, 0, 0, .05);
                    text-align: center;
                    line-height: 2.5rem;
                    i {
                        font-size: 1rem;
                        color: #999;
                        vertical-align: middle;
                    }
                }
                .imgItem {
                    position: relative;
                    float: left;
                    width: 2.5rem;
                    height: 2.5rem;
                    overflow: hidden;
                    margin: 0 .2rem .2rem 0;
                    &:nth-child(3n) {
                        margin-right: 0;
                    }
                    img {  
                        position: absolute;
                        width: 2.5rem;
                        // min-height: 100%;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        margin: auto;
                    }
                }
            }
            .editFriendBtn {
                margin-top: 1rem;
                .cancel {
                    margin-top: .3rem;
                }
            }
        }
        .commentInput {
            position: fixed;
            width: 100%;
            height: 1.5rem;
            bottom: 0;
            z-index: 2;
            background: #eae8e8;
            line-height: 1.5rem;
            padding: 0 .3rem;
            box-sizing: border-box;
            input {
                display: inline-block;
                width: 80%;
                font-size: .5rem;
                background: transparent;
                border-bottom: 1px solid green;
                vertical-align: middle;
                text-indent: .2rem;
                line-height: 1.5;
                margin-right: .2rem;
            }
            .pushComment {
                display: inline-block;
                vertical-align: middle;
            }
        }
    }
</style>