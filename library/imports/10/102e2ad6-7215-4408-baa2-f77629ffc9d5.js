"use strict";
cc._RF.push(module, '102e2rWchVECLqi93Yp/8nV', 'dotweenmanager');
// script/wx/common/dotweenmanager.js

'use strict';

var DoTweenType = require('dotweendefine').DoTweenType;
var ScrollAnimation = require('dotweendefine').ScrollAnimation;

var DoTweenManager = cc.Class({

    statics: {
        instance: null,
        getInstance: function getInstance() {
            if (DoTweenManager.instance == null) {
                DoTweenManager.instance = new DoTweenManager();
            }
            return DoTweenManager.instance;
        }
    },

    ctor: function ctor() {},

    /// for slot


    /// for scrollview

    /**
     * 播放scrollview增加或删除动画
     * @param {Number} type 
     * @param {Node} node 
     * @param {Number} duration 
     * @param {Function} callback 
     */
    playScrollAnimation: function playScrollAnimation(type, node, duration, callback) {
        switch (type) {
            case ScrollAnimation.MoveRightOut:
                this.moveRightOut(node, duration, callback);
                break;
            case ScrollAnimation.MoveLeftOut:
                this.moveLeftOut(node, duration, callback);
                break;
            case ScrollAnimation.MoveUpOut:
                this.moveUpOut(node, duration, callback);
                break;
            case ScrollAnimation.MoveDownOut:
                this.moveDownOut(node, duration, callback);
                break;
            case ScrollAnimation.MoveRightIn:
                this.moveRightIn(node, duration, callback);
                break;
            default:
                break;
        }
    },

    moveRightOut: function moveRightOut(node, duration, callback) {
        var delta = 10;
        var action = cc.moveBy(duration, node.width + delta, 0);
        this.executeAction(node, action, cc.easeIn(2), DoTweenType.MoveRightOut, callback);
    },

    moveRightIn: function moveRightIn(node, duration, callback) {
        var delta = 10;
        var distance = node.width + delta;
        node.x -= distance;
        var action = cc.moveBy(duration, distance, 0);
        this.executeAction(node, action, cc.easeIn(2), DoTweenType.MoveRightIn, callback);
    },

    moveLeftOut: function moveLeftOut(node, duration, callback) {
        var delta = 10;
        var action = cc.moveBy(duration, -node.width - delta, 0);
        this.executeAction(node, action, cc.easeIn(2), DoTweenType.MoveLeftOut, callback);
    },

    moveUpOut: function moveUpOut(node, duration, callback) {
        var delta = 10;
        var action = cc.moveBy(duration, 0, node.height + delta);
        this.executeAction(node, action, cc.easeIn(2), DoTweenType.MoveUpOut, callback);
    },

    moveDownOut: function moveDownOut(node, duration, callback) {
        var delta = 10;
        var action = cc.moveBy(duration, 0, -node.height - delta);
        this.executeAction(node, action, cc.easeIn(2), DoTweenType.MoveDownOut, callback);
    },

    moveListUp: function moveListUp(nodes, duration, distance, callback) {
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (i != nodes.length - 1) {
                this.moveUp(node, duration, distance);
            } else {
                this.moveUp(node, duration, distance, callback);
            }
        }
    },

    moveListLeft: function moveListLeft(nodes, duration, distance, callback) {
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (i != nodes.length - 1) {
                this.moveLeft(node, duration, distance);
            } else {
                this.moveLeft(node, duration, distance, callback);
            }
        }
    },

    moveUp: function moveUp(node, duration, distance, callback) {
        var action = cc.moveBy(duration, 0, distance);
        this.executeAction(node, action, null, DoTweenType.MoveUp, callback);
    },

    moveLeft: function moveLeft(node, duration, distance, callback) {
        var action = cc.moveBy(duration, distance, 0);
        this.executeAction(node, action, null, DoTweenType.MoveUp, callback);
    },

    /// 通用动作
    popUpModelWnd: function popUpModelWnd(node, tag, callback) {
        var scaleFrom = cc.p(0, 0);
        var scaleBig = cc.p(1.1, 1.1);
        var scaleSmall = cc.p(0.9, 0.9);
        var scaleTo = cc.p(1, 1);

        node.scaleX = scaleFrom.x;
        node.scaleY = scaleFrom.y;
        var action = cc.sequence(cc.scaleTo(0.2, scaleBig.x, scaleBig.y), cc.scaleTo(0.2, scaleSmall.x, scaleSmall.y), cc.scaleTo(0.2, scaleTo.x, scaleTo.y));

        this.executeAction(node, action, cc.easeIn(1), tag, callback);
    },

    removePopUpModelWnd: function removePopUpModelWnd(node, tag, callback) {
        var nodes = [node];
        this.scaleToPointFast(nodes, tag, callback);
    },

    rotateForever: function rotateForever(node, duration) {
        var action = cc.repeatForever(cc.rotateBy(duration, 360));
        this.executeAction(node, action);
    },

    showResourceDisPlay: function showResourceDisPlay(node, tag, callback) {
        var targetPos = node.getPosition();
        node.y += 200;
        var action = cc.moveTo(0.5, targetPos);
        this.executeAction(node, action, cc.easeBackOut(), tag, callback);
    },

    twist: function twist(node, tag, callback) {
        var scaleFrom = cc.p(0.9, 1.1);
        var scaleTo = cc.p(1.1, 0.9);
        var duration = 0.5;
        var action = cc.sequence(cc.scaleTo(duration, scaleFrom.x, scaleFrom.y), cc.scaleTo(duration, scaleTo.x, scaleTo.y), cc.scaleTo(duration, 1, 1));
        this.executeAction(node, action, cc.easeIn(1), tag, callback);
    },

    // 果冻效果
    jellyEffect: function jellyEffect(node) {
        var scale1 = cc.p(0.9, 1.1);
        var scale2 = cc.p(1.1, 0.9);

        var action = cc.repeatForever(cc.sequence(
        // cc.scaleTo(0.5, scale1.x, scale1.y).easing(cc.easeCubicActionOut()),
        // cc.scaleTo(0.5, scale2.x, scale2.y).easing(cc.easeCubicActionOut())
        cc.scaleTo(0.5, scale1.x, scale1.y), cc.scaleTo(0.5, scale2.x, scale2.y)));
        this.executeAction(node, action, cc.easeQuarticActionOut());
    },

    /// move to be a point
    scaleToPointFast: function scaleToPointFast(nodes, tag, callback) {
        var duration = 0.2;
        this.scaleToPoint(nodes, duration, tag, callback);
    },

    scaleToPointSlow: function scaleToPointSlow(nodes, tag, callback) {
        var duration = 0.3;
        this.scaleToPoint(nodes, duration, tag, callback);
    },

    scaleToPoint: function scaleToPoint(nodes, duration, tag, callback) {
        var scaleTo = cc.p(0, 0);
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            var action = cc.scaleTo(duration, scaleTo.x, scaleTo.y);

            if (i != nodes.length - 1) {
                this.executeAction(node, action, cc.easeBackIn(), tag);
            } else {
                this.executeAction(node, action, cc.easeBackIn(), tag, callback);
            }
        }
    },

    /// 低阶借口
    // 添加动作结束回调
    addCallback: function addCallback(action, callback) {
        // let callback = callback.callback;
        // let target = callback.target;
        // let opt = callback.opt;

        // let finished = cc.callFunc(callback, target, opt);
        var seq = cc.sequence(action, callback);
        return seq;
    },

    // 设置缓动动作
    setEaseAction: function setEaseAction(action, easeType) {
        if (!!easeType) {
            action.easing(easeType);
        }
    },

    // 设置动作标签
    setActionTag: function setActionTag(action, tag) {
        if (!!tag) {
            action.setTag(tag);
        }
    },

    // 根据标签获取动作
    getAction: function getAction(node, tag) {
        return node.getActionByTag(tag);
    },

    // 动作是否结束
    isActionDone: function isActionDone(node, tag) {
        var action = this.getAction(node, tag);
        if (action == null) {
            return true;
        }
        return action.isDone();
    },

    /**
     * 执行动作，可添加缓动动作，标签和回调
     * @param {Node} node 
     * @param {ActionInterval} action 
     * @param {Object} easeType 
     * @param {Number} tag 
     * @param {ActionInstant} callback 
     */
    executeAction: function executeAction(node, action, easeType, tag, callback) {
        this.setEaseAction(action, easeType);
        this.setActionTag(action, tag);
        if (!!callback) {
            action = this.addCallback(action, callback);
        }
        node.runAction(action);
    }
});

cc._RF.pop();