var RamlParser = require('./parser/ramlparser');
var ActionRequester = require('../data/dispatcher/actionrequester');
const defaultButton = {color: 'white', background: '#1991eb', width: 78, height: 36, borderRadius: '4px', border: 0};
const disableButton = {pointerEvents: 'none', background: '#a4a4a4', color: '#d3d3d3'};

module.exports = React.createClass({
    getInitialState: function() {
        return {
            name: '',
            type: 'RAML',
            format: 'URL',
            content: '',
            baseURI: '',
            log: '',
            uriResourceOptions: [],
            isParsed: false,
            loadedFile: {},
            rootFiles: [],
            selectedPath: ''
        };
    },

    componentDidMount: function () {
        this.refs.fileLoader.directory = true;
        this.refs.fileLoader.webkitdirectory = true;
    },

    hide: function() {
        this.setState({
            name: '',
            type: 'RAML',
            format: 'URL',
            content: '',
            baseURI: '',
            log: '',
            uriResourceOptions: [],
            isParsed: false,
            loadedFile: {},
            rootFiles: [],
            selectedPath: ''
        });
        this.props.hide();
    },

    renderDetail: function() {
        return (
            <div style={{height: 90}}>
                <div style={{display: 'flex', height: 30}}>
                    <span style={{flex: 1, textIndent: '16px', color: '#a8b5ca', fontSize: 12, lineHeight: '30px'}}>BaseURI</span>
                    <input style={{flex: 5, marginLeft: '10px', background: '#273142', border: 'solid 1px #313d4f', borderRadius: '4px', color: '#a8b5ca'}} value={this.state.baseURI} onChange={(e)=>this.setState({baseURI: e.target.value})}/>
                </div>
                <div style={{height: 20}}/>
                <div style={{textIndent: 5, color: '#a8b5ca'}}>UriResourceOptions</div>
                <div style={{height: 200, overflow: 'auto', border: '5px solid black'}}>
                    {
                        this.state.uriResourceOptions.map(function (option) {
                            return (
                                <div key={option} style={{height: 20, textIndent: 5, color: '#a8b5ca'}}>{option}</div>
                            );
                        })
                    }
                </div>
                <div style={{height: 20}}/>
            </div>
        );
    },

    parseUri: function() {
        var options = {
            "Names": this.state.name,
            "Format": this.state.format,
            "UriResource": this.state.content
        };
        var self = this;
        if (this.state.format === 'FILE') {
            RamlParser.parseByFile(this.state.selectedPath, this.state.loadedFile, function (res){
                if(res.error) {
                    self.setState({log: res.error});
                    return;
                }
                self.setState({
                    baseURI: res.baseUri,
                    uriResourceOptions: Object.keys(res.resources).map(function (resource) {
                        return window.atob(resource);
                    }),
                    isParsed: true, parsedDoc: res
                });
            });
        }
        else {
            if (options.UriResource.length === 0) {
                this.setState({log: 'empty string'});
                return;
            }
            RamlParser.parseByUri(options.UriResource, function (res) {
                if(res.error) { self.setState({log: res.error}); return; }
                self.setState({
                    baseURI: res.baseUri,
                    uriResourceOptions: Object.keys(res.resources).map(function (resource) {
                        return window.atob(resource);
                    }),
                    isParsed: true, parsedDoc: res
                });
            })
        }
    },

    onSave: function() {
        if (this.state.name.length === 0) {
            this.setState({log: 'Name is empty'});
            return;
        }
        var accordion = {
            name: this.state.name,
            type: this.state.type,
            parsedDoc: this.state.parsedDoc
        };
        accordion.parsedDoc.baseUri = this.state.baseURI;
        var self = this;
        n.call("accordion.set", accordion, function(err, res){
            if (res.success) {
                ActionRequester.updateData();
                self.hide();
            }
            else self.setState({log: res.message});
        });
    },

    onClick: function() {
        this.refs.fileLoader.click();
    },

    onLoad: function(e) {
        var files = e.target.files;
        var fileKeys = Object.keys(files);
        var scheme = {};
        var rootFiles = [];
        var self = this;
        function callback() {
            self.setState({
                loadedFile: scheme,
                rootFiles: rootFiles,
                selectedPath: rootFiles[0],
                isParsed: false
            });
        };
        fileKeys.forEach(function (key, i) {
            var relativeUri = files[key].webkitRelativePath;
            if((/\.(raml|json)$/i).test(relativeUri)) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    scheme[relativeUri] = e.target.result;
                }
                reader.readAsText(files[key], 'UTF-8');
                if (relativeUri.split('/').length === 2 && (/\.(raml)$/i).test(relativeUri)) rootFiles.push(relativeUri);
            }
            if(i === fileKeys.length - 1) {
                callback();
            }
        })
        this.refs.fileLoader.value = null;
    },

    render: function() {
        var self = this;
        return (
            <div>
                <div style={{position: 'fixed', width: '408px', height: '408px', top: '50%', left: '50%', marginTop: '-204px', marginLeft: '-204px', background: '#222c3c', zIndex: 1000, cursor: 'default'}}
                        onClick={(e)=>{
                        if(e.stopPropagation) e.stopPropagation(); //MOZILLA
                        else e.cancelBubble = true; //IE
                        }}
                >
                    <div style={{display: 'flex', height: 30}}>
                        <span style={{flex: 1, fontSize: 12, textIndent: '16px', color: 'white', background: '#1991eb', lineHeight: '30px'}}>New Item</span>
                    </div>
                    <div style={{height: 20}}/>
                    <div style={{display: 'flex', height: 30, marginRight: 15}}>
                        <span style={{flex: 1, fontSize: 12, lineHeight: '30px',  marginLeft: '15px', color: 'white'}}>Name</span>
                        <input
                            style={{flex: 5, background: '#273142', border: 'solid 1px #313d4f', borderRadius: '4px', color: '#a8b5ca'}} 
                            onChange={(e)=>{
                                if(e.stopPropagation) e.stopPropagation(); //MOZILLA
                                else e.cancelBubble = true; //IE
                                self.setState({name: e.target.value})
                            }}
                            value={this.state.name}
                        />
                    </div>
                    <div style={{height: 20}}/>
                    <div style={{top: 20}}>
                        <select value={self.state.type} style={{marginLeft: 15, width: '95%', height: 30, background: '#273142', border: 'solid 1px #313d4f', borderRadius: '4px', color: '#a8b5ca'}} onChange={(e)=>self.setState({type: e.target.value})}>
                            <option value='RAML'>RAML</option>
                            <option value='SWAGGER'>SWAGGER</option>
                            <option value='SAOP'>SOAP</option>
                        </select>
                    </div>
                    <div style={{height: 20}}/>
                    <input style={{display:'none'}} type='file' ref='fileLoader' onChange={self.onLoad} multiple/>
                    <div style={{display: 'flex', height: 30, marginLeft: 15, marginRight: 15}}>
                        <select value={self.state.format}style={{flex: 1, height: '100%', background: '#273142', border: 'solid 1px #313d4f', borderRadius: '4px', color: '#a8b5ca'}}
                                onChange={(e)=>{
                                    self.setState({
                                        format: e.target.value,
                                        content: '',
                                        uriResourceOptions: [],
                                        isParsed: false,
                                        loadedFile: {},
                                        rootFiles: [],
                                        selectedPath: '',
                                        log: ''
                                    })
                        }}>
                            <option value='URL'>URL</option>
                            <option value='FILE'>FILE</option>
                        </select>
                        <div style={{marginLeft: '5px', flex: 5, marginRight: '5px', height: '100%'}}>
                        {
                            self.state.rootFiles.length > 0 ?
                            <select value={self.state.selectedPath} style={{width: '100%', height: '100%', background: '#273142', border: 'solid 1px #313d4f', borderRadius: '4px', color: '#a8b5ca'}}
                                    onChange={(e)=>self.setState({selectedPath: e.target.value})}>
                                {
                                    self.state.rootFiles.map(function (file) {
                                        return (
                                            <option key={file} value={file}>{file}</option>
                                        )
                                    })
                                }
                            </select>
                            :
                            <input style={{width: '100%', height: '100%', background: '#273142', border: 'solid 1px #313d4f', borderRadius: '4px', color: '#a8b5ca'}}
                                    value={this.state.content} onChange={(e)=>this.setState({content: e.target.value})}/>
                        }
                        </div>
                    </div>
                    <div style={{height: 18}}/>
                    <div style={{height: 36}}>
                        <span style={{display:'inline-block', textIndent: '25px', fontSize: 12, lineHeight: '36px',  width: '315px'}}>{this.state.log}</span>
                        <span style={{position: 'absolute', right: '15px'}}>
                        {
                            self.state.format === 'FILE' &&
                            <button onClick={self.onClick} style={Object.assign({marginRight: '15px'},defaultButton)} >
                                Import
                            </button>
                        }
                        {
                            (self.state.format === 'URL' || self.state.rootFiles.length > 0)  &&
                            <button style={
                                Object.assign({marginRight: '15px'}, this.state.format !== 'URL' || this.state.content.length > 0 ? defaultButton : defaultButton)}
                                onClick={this.parseUri}>Parse</button>
                        }
                        </span>
                    </div>
                    <div style={{height: 12}}/>
                    <div style={{height: 128, overflow: 'auto'}}>
                        {this.state.isParsed && this.renderDetail()}
                    </div>
                    <div style={{ height: 68, background: '#273142', width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <button style={Object.assign({marginRight: 6}, defaultButton)} onClick={this.hide}>Cancel</button>
                        <button style={
                            Object.assign({marginRight: 6},defaultButton)}
                            onClick={this.onSave}>Generate</button>
                    </div>
                </div>
            </div>
        );
    }
});
