import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { actionCreators } from '../store/DocType';
import { ExportCSV } from './ExportCSV';


class DocTypeList extends Component {

    constructor() {
        super();
        this.state = {};
        this.onDocTypeSelect = this.onDocTypeSelect.bind(this);
        this.dialogHide = this.dialogHide.bind(this);
        this.addNew = this.addNew.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate() {
        // Этот метод вызывается при изменении параметров маршрута
        if (this.props.forceReload) {
            this.fetchData();
        }
    }

    fetchData() {
        this.props.requestDocType();
    }

    updateProperty(property, value) {
        let doctype = this.state.doctype;
        doctype[property] = value;
        this.setState({ doctype: doctype });
    }

    onDocTypeSelect(e) {
        this.newDocType = false;
        this.setState({
            displayDialog: true,
            doctype: Object.assign({}, e.data)
        });
    }

    dialogHide() {
        this.setState({ displayDialog: false });
    }

    addNew() {
        this.newDocType = true;
        this.setState({
            doctype: { name: '' },
            displayDialog: true
        });
    }

    save() {
        this.props.saveDocType(this.state.doctype);
        this.dialogHide();
        this.growl.show({ severity: 'success', detail: this.newDocType ? "Сохранено" : "Обновлено" });
    }

    delete() {
        this.props.deleteDocType(this.state.doctype.docTypeId);
        this.dialogHide();
        this.growl.show({ severity: 'error', detail: "Данные удалены" });
    }

    render() {

        let header = <div className="p-clearfix" style={{ width: '100%' }}>
            <Button style={{ background: 'rgba(0, 170, 204, 1)', float: 'left' }} label="Добавить" onClick={this.addNew} />
            <ExportCSV csvData={this.props.doctype} fileName={'Типы документов'} />
        </div>;

        let dialogHeader = <div className="ui-dialog-buttonpane p-clearfix">
            <p style={{ float: 'left' }}>Тип документа</p>
            <Button style={{ float: 'right' }} className="p-button-danger" label="X" onClick={this.dialogHide}/>
        </div>;

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            <Button style={{ background: 'rgba(0, 170, 204, 1)' }} label="Сохранить" onClick={this.save} />
            <Button style={{ background: 'rgba(242, 12, 108, 1)' }} label="Удалить" disabled={this.newDocType ? true : false} onClick={this.delete} />
        </div>;

        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <h2 style={{ color: 'rgba(80, 86, 89, 1)', marginBottom: '50px', marginTop: '50px' }}>Типы документов</h2>
                <DataTable value={this.props.doctype} selectionMode="single" header={header} selection={this.state.selectedDocType} onSelectionChange={e => this.setState({ selectedDocType: e.value })} onRowSelect={this.onDocTypeSelect}>
                    <Column field="docTypeId" header="ID" />
                    <Column field="name" header="Наименование" />
                </DataTable>
                <Dialog visible={this.state.displayDialog} style={{ 'width': '380px' }} header={dialogHeader} modal={true} footer={dialogFooter} onHide={() => this.setState({ displayDialog: false })}>
                    {
                        this.state.doctype &&

                        <div className="p-grid p-fluid">
                            <div><label htmlFor="name">Наименование</label></div>
                            <div>
                                <InputText id="name" onChange={(e) => { this.updateProperty('name', e.target.value) }} value={this.state.doctype.name} />
                            </div>

                        </div>
                    }
                </Dialog>
            </div>
        )
    }
}

// Make doctype array available in props 
function mapStateToProps(state) {
    return {
        doctype: state.doctype.doctype,
        loading: state.doctype.loading,
        errors: state.doctype.errors,
        forceReload:state.doctype.forceReload
    }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(DocTypeList);