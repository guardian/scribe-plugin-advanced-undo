!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self),n.scribePluginAdvancedUndo=e()}}(function(){return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(){},{}],2:[function(require,module){function createVNode(domNode,key){return key=key||null,1==domNode.nodeType?createFromElement(domNode,key):3==domNode.nodeType?createFromTextNode(domNode,key):void 0}function createFromTextNode(tNode){return new VText(tNode.nodeValue)}function createFromElement(el){for(var tagName=el.tagName,namespace="http://www.w3.org/1999/xhtml"==el.namespaceURI?null:el.namespaceURI,properties=getElementProperties(el),children=[],i=0;i<el.childNodes.length;i++)children.push(createVNode(el.childNodes[i]));return new VNode(tagName,properties,children,null,namespace)}function getElementProperties(el){var obj={};return props.forEach(function(propName){if(el[propName]){if("style"==propName){for(var styleProp,css={},i=0;i<el.style.length;i++)styleProp=el.style[i],css[styleProp]=el.style.getPropertyValue(styleProp);return void(obj[propName]=css)}if("dataset"==propName){var data={};for(var p in el.dataset)data[p]=el.dataset[p];return void(obj[propName]=data)}"attributes"!=propName&&("tabIndex"!=propName||-1!==el.tabIndex)&&(obj[propName]=el[propName])}}),obj}var VNode=require("vtree/vnode"),VText=require("vtree/vtext");module.exports=createVNode,createVNode.fromHTML=function(html,key){var domNode=document.createElement("div");return domNode.innerHTML=html,domNode=domNode.children[0]||domNode,createVNode(domNode,key)};{var props=module.exports.properties=["accept","accessKey","action","alt","async","autoComplete","autoPlay","cellPadding","cellSpacing","checked","className","colSpan","content","contentEditable","controls","crossOrigin","data","dataset","defer","dir","download","draggable","encType","formNoValidate","href","hrefLang","htmlFor","httpEquiv","icon","id","label","lang","list","loop","max","mediaGroup","method","min","multiple","muted","name","noValidate","pattern","placeholder","poster","preload","radioGroup","readOnly","rel","required","rowSpan","sandbox","scope","scrollLeft","scrolling","scrollTop","selected","span","spellCheck","src","srcDoc","srcSet","start","step","style","tabIndex","target","title","type","value","autoCapitalize","autoCorrect","property","attributes"];module.exports.attrs=["allowFullScreen","allowTransparency","charSet","cols","contextMenu","dateTime","disabled","form","frameBorder","height","hidden","maxLength","role","rows","seamless","size","width","wmode","cx","cy","d","dx","dy","fill","fx","fy","gradientTransform","gradientUnits","offset","points","r","rx","ry","spreadMethod","stopColor","stopOpacity","stroke","strokeLinecap","strokeWidth","textAnchor","transform","version","viewBox","x1","x2","x","y1","y2","y"]}},{"vtree/vnode":7,"vtree/vtext":8}],3:[function(require,module){function isHook(hook){return hook&&"function"==typeof hook.hook&&!hook.hasOwnProperty("hook")}module.exports=isHook},{}],4:[function(require,module){function isVirtualNode(x){return x&&"VirtualNode"===x.type&&x.version===version}var version=require("./version");module.exports=isVirtualNode},{"./version":6}],5:[function(require,module){function isWidget(w){return w&&"Widget"===w.type}module.exports=isWidget},{}],6:[function(require,module){module.exports="1"},{}],7:[function(require,module){function VirtualNode(tagName,properties,children,key,namespace){this.tagName=tagName,this.properties=properties||noProperties,this.children=children||noChildren,this.key=null!=key?String(key):void 0,this.namespace="string"==typeof namespace?namespace:null;var hooks,count=children&&children.length||0,descendants=0,hasWidgets=!1,descendantHooks=!1;for(var propName in properties)if(properties.hasOwnProperty(propName)){var property=properties[propName];isVHook(property)&&(hooks||(hooks={}),hooks[propName]=property)}for(var i=0;count>i;i++){var child=children[i];isVNode(child)?(descendants+=child.count||0,!hasWidgets&&child.hasWidgets&&(hasWidgets=!0),descendantHooks||!child.hooks&&!child.descendantHooks||(descendantHooks=!0)):!hasWidgets&&isWidget(child)&&"function"==typeof child.destroy&&(hasWidgets=!0)}this.count=count+descendants,this.hasWidgets=hasWidgets,this.hooks=hooks,this.descendantHooks=descendantHooks}var version=require("./version"),isVNode=require("./is-vnode"),isWidget=require("./is-widget"),isVHook=require("./is-vhook");module.exports=VirtualNode;var noProperties={},noChildren=[];VirtualNode.prototype.version=version,VirtualNode.prototype.type="VirtualNode"},{"./is-vhook":3,"./is-vnode":4,"./is-widget":5,"./version":6}],8:[function(require,module){function VirtualText(text){this.text=String(text)}var version=require("./version");module.exports=VirtualText,VirtualText.prototype.version=version,VirtualText.prototype.type="VirtualText"},{"./version":6}],9:[function(require,module){var diff=require("./vtree/diff.js");module.exports=diff},{"./vtree/diff.js":29}],10:[function(require,module){(function(global){var topLevel="undefined"!=typeof global?global:"undefined"!=typeof window?window:{},minDoc=require("min-document");if("undefined"!=typeof document)module.exports=document;else{var doccy=topLevel["__GLOBAL_DOCUMENT_CACHE@4"];doccy||(doccy=topLevel["__GLOBAL_DOCUMENT_CACHE@4"]=minDoc),module.exports=doccy}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"min-document":1}],11:[function(require,module){"use strict";module.exports=function(x){return"object"==typeof x&&null!==x}},{}],12:[function(require,module){function isArray(obj){return"[object Array]"===toString.call(obj)}var nativeIsArray=Array.isArray,toString=Object.prototype.toString;module.exports=nativeIsArray||isArray},{}],13:[function(require,module){var patch=require("./vdom/patch.js");module.exports=patch},{"./vdom/patch.js":18}],14:[function(require,module){function applyProperties(node,props,previous){for(var propName in props){var propValue=props[propName];void 0===propValue?removeProperty(node,propName,propValue,previous):isHook(propValue)?(removeProperty(node,propName,propValue,previous),propValue.hook&&propValue.hook(node,propName,previous?previous[propName]:void 0)):isObject(propValue)?patchObject(node,props,previous,propName,propValue):node[propName]=propValue}}function removeProperty(node,propName,propValue,previous){if(previous){var previousValue=previous[propName];if(isHook(previousValue))previousValue.unhook&&previousValue.unhook(node,propName,propValue);else if("attributes"===propName)for(var attrName in previousValue)node.removeAttribute(attrName);else if("style"===propName)for(var i in previousValue)node.style[i]="";else node[propName]="string"==typeof previousValue?"":null}}function patchObject(node,props,previous,propName,propValue){var previousValue=previous?previous[propName]:void 0;if("attributes"!==propName){if(previousValue&&isObject(previousValue)&&getPrototype(previousValue)!==getPrototype(propValue))return void(node[propName]=propValue);isObject(node[propName])||(node[propName]={});var replacer="style"===propName?"":void 0;for(var k in propValue){var value=propValue[k];node[propName][k]=void 0===value?replacer:value}}else for(var attrName in propValue){var attrValue=propValue[attrName];void 0===attrValue?node.removeAttribute(attrName):node.setAttribute(attrName,attrValue)}}function getPrototype(value){return Object.getPrototypeOf?Object.getPrototypeOf(value):value.__proto__?value.__proto__:value.constructor?value.constructor.prototype:void 0}var isObject=require("is-object"),isHook=require("../vnode/is-vhook.js");module.exports=applyProperties},{"../vnode/is-vhook.js":22,"is-object":11}],15:[function(require,module){function createElement(vnode,opts){var doc=opts?opts.document||document:document,warn=opts?opts.warn:null;if(vnode=handleThunk(vnode).a,isWidget(vnode))return vnode.init();if(isVText(vnode))return doc.createTextNode(vnode.text);if(!isVNode(vnode))return warn&&warn("Item is not a valid virtual dom node",vnode),null;var node=null===vnode.namespace?doc.createElement(vnode.tagName):doc.createElementNS(vnode.namespace,vnode.tagName),props=vnode.properties;applyProperties(node,props);for(var children=vnode.children,i=0;i<children.length;i++){var childNode=createElement(children[i],opts);childNode&&node.appendChild(childNode)}return node}var document=require("global/document"),applyProperties=require("./apply-properties"),isVNode=require("../vnode/is-vnode.js"),isVText=require("../vnode/is-vtext.js"),isWidget=require("../vnode/is-widget.js"),handleThunk=require("../vnode/handle-thunk.js");module.exports=createElement},{"../vnode/handle-thunk.js":20,"../vnode/is-vnode.js":23,"../vnode/is-vtext.js":24,"../vnode/is-widget.js":25,"./apply-properties":14,"global/document":10}],16:[function(require,module){function domIndex(rootNode,tree,indices,nodes){return indices&&0!==indices.length?(indices.sort(ascending),recurse(rootNode,tree,indices,nodes,0)):{}}function recurse(rootNode,tree,indices,nodes,rootIndex){if(nodes=nodes||{},rootNode){indexInRange(indices,rootIndex,rootIndex)&&(nodes[rootIndex]=rootNode);var vChildren=tree.children;if(vChildren)for(var childNodes=rootNode.childNodes,i=0;i<tree.children.length;i++){rootIndex+=1;var vChild=vChildren[i]||noChild,nextIndex=rootIndex+(vChild.count||0);indexInRange(indices,rootIndex,nextIndex)&&recurse(childNodes[i],vChild,indices,nodes,rootIndex),rootIndex=nextIndex}}return nodes}function indexInRange(indices,left,right){if(0===indices.length)return!1;for(var currentIndex,currentItem,minIndex=0,maxIndex=indices.length-1;maxIndex>=minIndex;){if(currentIndex=(maxIndex+minIndex)/2>>0,currentItem=indices[currentIndex],minIndex===maxIndex)return currentItem>=left&&right>=currentItem;if(left>currentItem)minIndex=currentIndex+1;else{if(!(currentItem>right))return!0;maxIndex=currentIndex-1}}return!1}function ascending(a,b){return a>b?1:-1}var noChild={};module.exports=domIndex},{}],17:[function(require,module){function applyPatch(vpatch,domNode,renderOptions){var type=vpatch.type,vNode=vpatch.vNode,patch=vpatch.patch;switch(type){case VPatch.REMOVE:return removeNode(domNode,vNode);case VPatch.INSERT:return insertNode(domNode,patch,renderOptions);case VPatch.VTEXT:return stringPatch(domNode,vNode,patch,renderOptions);case VPatch.WIDGET:return widgetPatch(domNode,vNode,patch,renderOptions);case VPatch.VNODE:return vNodePatch(domNode,vNode,patch,renderOptions);case VPatch.ORDER:return reorderChildren(domNode,patch),domNode;case VPatch.PROPS:return applyProperties(domNode,patch,vNode.properties),domNode;case VPatch.THUNK:return replaceRoot(domNode,renderOptions.patch(domNode,patch,renderOptions));default:return domNode}}function removeNode(domNode,vNode){var parentNode=domNode.parentNode;return parentNode&&parentNode.removeChild(domNode),destroyWidget(domNode,vNode),null}function insertNode(parentNode,vNode,renderOptions){var newNode=render(vNode,renderOptions);return parentNode&&parentNode.appendChild(newNode),parentNode}function stringPatch(domNode,leftVNode,vText,renderOptions){var newNode;if(3===domNode.nodeType)domNode.replaceData(0,domNode.length,vText.text),newNode=domNode;else{var parentNode=domNode.parentNode;newNode=render(vText,renderOptions),parentNode&&parentNode.replaceChild(newNode,domNode)}return newNode}function widgetPatch(domNode,leftVNode,widget,renderOptions){var newNode,updating=updateWidget(leftVNode,widget);newNode=updating?widget.update(leftVNode,domNode)||domNode:render(widget,renderOptions);var parentNode=domNode.parentNode;return parentNode&&newNode!==domNode&&parentNode.replaceChild(newNode,domNode),updating||destroyWidget(domNode,leftVNode),newNode}function vNodePatch(domNode,leftVNode,vNode,renderOptions){var parentNode=domNode.parentNode,newNode=render(vNode,renderOptions);return parentNode&&parentNode.replaceChild(newNode,domNode),newNode}function destroyWidget(domNode,w){"function"==typeof w.destroy&&isWidget(w)&&w.destroy(domNode)}function reorderChildren(domNode,bIndex){var i,children=[],childNodes=domNode.childNodes,len=childNodes.length,reverseIndex=bIndex.reverse;for(i=0;len>i;i++)children.push(domNode.childNodes[i]);var move,node,insertNode,chainLength,insertedLength,insertOffset=0;for(i=0;len>i;){if(move=bIndex[i],chainLength=1,void 0!==move&&move!==i){for(;bIndex[i+chainLength]===move+chainLength;)chainLength++;for(reverseIndex[i]>i+chainLength&&insertOffset++,node=children[move],insertNode=childNodes[i+insertOffset]||null,insertedLength=0;node!==insertNode&&insertedLength++<chainLength;)domNode.insertBefore(node,insertNode),node=children[move+insertedLength];i>move+chainLength&&insertOffset--}i in bIndex.removes&&insertOffset++,i+=chainLength}}function replaceRoot(oldRoot,newRoot){return oldRoot&&newRoot&&oldRoot!==newRoot&&oldRoot.parentNode&&(console.log(oldRoot),oldRoot.parentNode.replaceChild(newRoot,oldRoot)),newRoot}var applyProperties=require("./apply-properties"),isWidget=require("../vnode/is-widget.js"),VPatch=require("../vnode/vpatch.js"),render=require("./create-element"),updateWidget=require("./update-widget");module.exports=applyPatch},{"../vnode/is-widget.js":25,"../vnode/vpatch.js":27,"./apply-properties":14,"./create-element":15,"./update-widget":19}],18:[function(require,module){function patch(rootNode,patches){return patchRecursive(rootNode,patches)}function patchRecursive(rootNode,patches,renderOptions){var indices=patchIndices(patches);if(0===indices.length)return rootNode;var index=domIndex(rootNode,patches.a,indices),ownerDocument=rootNode.ownerDocument;renderOptions||(renderOptions={patch:patchRecursive},ownerDocument!==document&&(renderOptions.document=ownerDocument));for(var i=0;i<indices.length;i++){var nodeIndex=indices[i];rootNode=applyPatch(rootNode,index[nodeIndex],patches[nodeIndex],renderOptions)}return rootNode}function applyPatch(rootNode,domNode,patchList,renderOptions){if(!domNode)return rootNode;var newNode;if(isArray(patchList))for(var i=0;i<patchList.length;i++)newNode=patchOp(patchList[i],domNode,renderOptions),domNode===rootNode&&(rootNode=newNode);else newNode=patchOp(patchList,domNode,renderOptions),domNode===rootNode&&(rootNode=newNode);return rootNode}function patchIndices(patches){var indices=[];for(var key in patches)"a"!==key&&indices.push(Number(key));return indices}var document=require("global/document"),isArray=require("x-is-array"),domIndex=require("./dom-index"),patchOp=require("./patch-op");module.exports=patch},{"./dom-index":16,"./patch-op":17,"global/document":10,"x-is-array":12}],19:[function(require,module){function updateWidget(a,b){return isWidget(a)&&isWidget(b)?"name"in a&&"name"in b?a.id===b.id:a.init===b.init:!1}var isWidget=require("../vnode/is-widget.js");module.exports=updateWidget},{"../vnode/is-widget.js":25}],20:[function(require,module){function handleThunk(a,b){var renderedA=a,renderedB=b;return isThunk(b)&&(renderedB=renderThunk(b,a)),isThunk(a)&&(renderedA=renderThunk(a,null)),{a:renderedA,b:renderedB}}function renderThunk(thunk,previous){var renderedThunk=thunk.vnode;if(renderedThunk||(renderedThunk=thunk.vnode=thunk.render(previous)),!(isVNode(renderedThunk)||isVText(renderedThunk)||isWidget(renderedThunk)))throw new Error("thunk did not return a valid node");return renderedThunk}var isVNode=require("./is-vnode"),isVText=require("./is-vtext"),isWidget=require("./is-widget"),isThunk=require("./is-thunk");module.exports=handleThunk},{"./is-thunk":21,"./is-vnode":23,"./is-vtext":24,"./is-widget":25}],21:[function(require,module){function isThunk(t){return t&&"Thunk"===t.type}module.exports=isThunk},{}],22:[function(require,module){function isHook(hook){return hook&&("function"==typeof hook.hook&&!hook.hasOwnProperty("hook")||"function"==typeof hook.unhook&&!hook.hasOwnProperty("unhook"))}module.exports=isHook},{}],23:[function(require,module,exports){arguments[4][4][0].apply(exports,arguments)},{"./version":26,dup:4}],24:[function(require,module){function isVirtualText(x){return x&&"VirtualText"===x.type&&x.version===version}var version=require("./version");module.exports=isVirtualText},{"./version":26}],25:[function(require,module,exports){arguments[4][5][0].apply(exports,arguments)},{dup:5}],26:[function(require,module,exports){arguments[4][6][0].apply(exports,arguments)},{dup:6}],27:[function(require,module){function VirtualPatch(type,vNode,patch){this.type=Number(type),this.vNode=vNode,this.patch=patch}var version=require("./version");VirtualPatch.NONE=0,VirtualPatch.VTEXT=1,VirtualPatch.VNODE=2,VirtualPatch.WIDGET=3,VirtualPatch.PROPS=4,VirtualPatch.ORDER=5,VirtualPatch.INSERT=6,VirtualPatch.REMOVE=7,VirtualPatch.THUNK=8,module.exports=VirtualPatch,VirtualPatch.prototype.version=version,VirtualPatch.prototype.type="VirtualPatch"},{"./version":26}],28:[function(require,module){function diffProps(a,b){var diff;for(var aKey in a){aKey in b||(diff=diff||{},diff[aKey]=void 0);var aValue=a[aKey],bValue=b[aKey];if(aValue!==bValue)if(isObject(aValue)&&isObject(bValue))if(getPrototype(bValue)!==getPrototype(aValue))diff=diff||{},diff[aKey]=bValue;else if(isHook(bValue))diff=diff||{},diff[aKey]=bValue;else{var objectDiff=diffProps(aValue,bValue);objectDiff&&(diff=diff||{},diff[aKey]=objectDiff)}else diff=diff||{},diff[aKey]=bValue}for(var bKey in b)bKey in a||(diff=diff||{},diff[bKey]=b[bKey]);return diff}function getPrototype(value){return Object.getPrototypeOf?Object.getPrototypeOf(value):value.__proto__?value.__proto__:value.constructor?value.constructor.prototype:void 0}var isObject=require("is-object"),isHook=require("../vnode/is-vhook");module.exports=diffProps},{"../vnode/is-vhook":22,"is-object":11}],29:[function(require,module){function diff(a,b){var patch={a:a};return walk(a,b,patch,0),patch}function walk(a,b,patch,index){if(a!==b){var apply=patch[index],applyClear=!1;if(isThunk(a)||isThunk(b))thunks(a,b,patch,index);else if(null==b)isWidget(a)||(clearState(a,patch,index),apply=patch[index]),apply=appendPatch(apply,new VPatch(VPatch.REMOVE,a,b));else if(isVNode(b))if(isVNode(a))if(a.tagName===b.tagName&&a.namespace===b.namespace&&a.key===b.key){var propsPatch=diffProps(a.properties,b.properties);propsPatch&&(apply=appendPatch(apply,new VPatch(VPatch.PROPS,a,propsPatch))),apply=diffChildren(a,b,patch,apply,index)}else apply=appendPatch(apply,new VPatch(VPatch.VNODE,a,b)),applyClear=!0;else apply=appendPatch(apply,new VPatch(VPatch.VNODE,a,b)),applyClear=!0;else isVText(b)?isVText(a)?a.text!==b.text&&(apply=appendPatch(apply,new VPatch(VPatch.VTEXT,a,b))):(apply=appendPatch(apply,new VPatch(VPatch.VTEXT,a,b)),applyClear=!0):isWidget(b)&&(isWidget(a)||(applyClear=!0),apply=appendPatch(apply,new VPatch(VPatch.WIDGET,a,b)));apply&&(patch[index]=apply),applyClear&&clearState(a,patch,index)}}function diffChildren(a,b,patch,apply,index){for(var aChildren=a.children,bChildren=reorder(aChildren,b.children),aLen=aChildren.length,bLen=bChildren.length,len=aLen>bLen?aLen:bLen,i=0;len>i;i++){var leftNode=aChildren[i],rightNode=bChildren[i];index+=1,leftNode?walk(leftNode,rightNode,patch,index):rightNode&&(apply=appendPatch(apply,new VPatch(VPatch.INSERT,null,rightNode))),isVNode(leftNode)&&leftNode.count&&(index+=leftNode.count)}return bChildren.moves&&(apply=appendPatch(apply,new VPatch(VPatch.ORDER,a,bChildren.moves))),apply}function clearState(vNode,patch,index){unhook(vNode,patch,index),destroyWidgets(vNode,patch,index)}function destroyWidgets(vNode,patch,index){if(isWidget(vNode))"function"==typeof vNode.destroy&&(patch[index]=appendPatch(patch[index],new VPatch(VPatch.REMOVE,vNode,null)));else if(isVNode(vNode)&&(vNode.hasWidgets||vNode.hasThunks))for(var children=vNode.children,len=children.length,i=0;len>i;i++){var child=children[i];index+=1,destroyWidgets(child,patch,index),isVNode(child)&&child.count&&(index+=child.count)}else isThunk(vNode)&&thunks(vNode,null,patch,index)}function thunks(a,b,patch,index){var nodes=handleThunk(a,b),thunkPatch=diff(nodes.a,nodes.b);hasPatches(thunkPatch)&&(patch[index]=new VPatch(VPatch.THUNK,null,thunkPatch))}function hasPatches(patch){for(var index in patch)if("a"!==index)return!0;return!1}function unhook(vNode,patch,index){if(isVNode(vNode)){if(vNode.hooks&&(patch[index]=appendPatch(patch[index],new VPatch(VPatch.PROPS,vNode,undefinedKeys(vNode.hooks)))),vNode.descendantHooks||vNode.hasThunks)for(var children=vNode.children,len=children.length,i=0;len>i;i++){var child=children[i];index+=1,unhook(child,patch,index),isVNode(child)&&child.count&&(index+=child.count)}}else isThunk(vNode)&&thunks(vNode,null,patch,index)}function undefinedKeys(obj){var result={};for(var key in obj)result[key]=void 0;return result}function reorder(aChildren,bChildren){var bKeys=keyIndex(bChildren);if(!bKeys)return bChildren;var aKeys=keyIndex(aChildren);if(!aKeys)return bChildren;var bMatch={},aMatch={};for(var aKey in bKeys)bMatch[bKeys[aKey]]=aKeys[aKey];for(var bKey in aKeys)aMatch[aKeys[bKey]]=bKeys[bKey];for(var aLen=aChildren.length,bLen=bChildren.length,len=aLen>bLen?aLen:bLen,shuffle=[],freeIndex=0,i=0,moveIndex=0,moves={},removes=moves.removes={},reverse=moves.reverse={},hasMoves=!1;len>freeIndex;){var move=aMatch[i];if(void 0!==move)shuffle[i]=bChildren[move],move!==moveIndex&&(moves[move]=moveIndex,reverse[moveIndex]=move,hasMoves=!0),moveIndex++;else if(i in aMatch)shuffle[i]=void 0,removes[i]=moveIndex++,hasMoves=!0;else{for(;void 0!==bMatch[freeIndex];)freeIndex++;if(len>freeIndex){var freeChild=bChildren[freeIndex];freeChild&&(shuffle[i]=freeChild,freeIndex!==moveIndex&&(hasMoves=!0,moves[freeIndex]=moveIndex,reverse[moveIndex]=freeIndex),moveIndex++),freeIndex++}}i++}return hasMoves&&(shuffle.moves=moves),shuffle}function keyIndex(children){var i,keys;for(i=0;i<children.length;i++){var child=children[i];void 0!==child.key&&(keys=keys||{},keys[child.key]=i)}return keys}function appendPatch(apply,patch){return apply?(isArray(apply)?apply.push(patch):apply=[apply,patch],apply):patch}var isArray=require("x-is-array"),VPatch=require("../vnode/vpatch"),isVNode=require("../vnode/is-vnode"),isVText=require("../vnode/is-vtext"),isWidget=require("../vnode/is-widget"),isThunk=require("../vnode/is-thunk"),handleThunk=require("../vnode/handle-thunk"),diffProps=require("./diff-props");module.exports=diff},{"../vnode/handle-thunk":20,"../vnode/is-thunk":21,"../vnode/is-vnode":23,"../vnode/is-vtext":24,"../vnode/is-widget":25,"../vnode/vpatch":27,"./diff-props":28,"x-is-array":12}],30:[function(require,module){"use strict";var _prototypeProperties=function(child,staticProps,instanceProps){staticProps&&Object.defineProperties(child,staticProps),instanceProps&&Object.defineProperties(child.prototype,instanceProps)},_classCallCheck=function(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")},diff=require("virtual-dom/diff"),patch=require("virtual-dom/patch"),virtualize=require("vdom-virtualize");module.exports=function(){function UndoController(scribe){var _this=this;_classCallCheck(this,UndoController),scribe.commands.undo.execute=function(){},this.scribe=scribe,this.diffs=[],this.count=0,this.lastContent=virtualize(this.scribe.el),this.scribe.el.addEventListener("input",function(e){return _this.onContentChanged(e)}),this.scribe.el.addEventListener("keydown",function(e){return _this.onKeyPressed(e)})}return _prototypeProperties(UndoController,null,{onKeyPressed:{value:function(e){if(e.metaKey&&90===e.keyCode){console.log("undo action"),e.preventDefault();var diff=this.diffs.pop();patch(this.scribe.el,diff),this.count+=1}},writable:!0,configurable:!0},onContentChanged:{value:function(){var _this=this;console.log("-----------------------"),console.log(this),console.log("-----------------------"),this._placeMarkers(function(){var newContent=virtualize(_this.scribe.el),revertDiff=diff(newContent,_this.lastContent);_this.diffs.push(revertDiff),_this.lastContent=newContent})},writable:!0,configurable:!0},_placeMarkers:{value:function(fn){var s=new this.scribe.api.Selection;s.placeMarkerds(),fn(),s.removeMarkers()},writable:!0,configurable:!0}}),UndoController}()},{"vdom-virtualize":2,"virtual-dom/diff":9,"virtual-dom/patch":13}],31:[function(require,module){"use strict";var UndoController=require("./UndoController");module.exports=function(){return function(scribe,attrs){return new UndoController(scribe,attrs)}}},{"./UndoController":30}]},{},[31])(31)});
//# sourceMappingURL=./build/main.build.js.map