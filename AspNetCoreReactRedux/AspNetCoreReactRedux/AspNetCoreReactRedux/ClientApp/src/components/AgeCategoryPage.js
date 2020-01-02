import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { actionCreators } from '../store/AgeCategory';
import { ExportCSV } from './ExportCSV';


class AgeCategoryPage extends Component {

    constructor() {
        super();
        this.state = {};
        this.onAgeCategorySelect = this.onAgeCategorySelect.bind(this);
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
        this.props.requestAgeCategory();
    }

    updateProperty(property, value) {
        let agecategory = this.state.agecategory;
        agecategory[property] = value;
        this.setState({ agecategory: agecategory });
    }

    onAgeCategorySelect(e) {
        this.newAgeCategory = false;
        this.setState({
            displayDialog: true,
            agecategory: Object.assign({}, e.data)
        });
    }

    dialogHide() {
        this.setState({ displayDialog: false });
    }

    addNew() {
        this.newAgeCategory = true;
        this.setState({
            agecategory: { name: '' },
            displayDialog: true
        });
    }

    save() {
        this.props.saveAgeCategory(this.state.agecategory);
        this.dialogHide();
        this.growl.show({ severity: 'success', detail: this.newAgeCategory ? "Сохранено" : "Обновлено" });
    }

    delete() {
        this.props.deleteAgeCategory(this.state.agecategory.ageCategoryId);
        this.dialogHide();
        this.growl.show({ severity: 'error', detail: "Данные удалены" });
    }

    render() {

        let header = <div className="p-clearfix" style={{ width: '100%' }}>
            <Button style={{ background: 'rgba(0, 170, 204, 1)', float: 'left' }} label="Добавить" onClick={this.addNew} />
            <ExportCSV csvData={this.props.agecategory} fileName={'Возрастные категории'} />
        </div>;

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            <Button style={{ background: 'rgba(0, 170, 204, 1)' }} label="Сохранить" onClick={this.save} />
            <Button style={{ background: 'rgba(242, 12, 108, 1)' }} label="Удалить" disabled={this.newAgeCategory ? true : false} onClick={this.delete} />
        </div>;

        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <h2 style={{ color: 'rgba(80, 86, 89, 1)', marginBottom: '50px', marginTop: '50px' }}>Возрастные категории</h2>
                <DataTable value={this.props.agecategory} selectionMode="single" header={header} selection={this.state.selectedAgeCategory} onSelectionChange={e => this.setState({ selectedAgeCategory: e.value })} onRowSelect={this.onAgeCategorySelect}>
                    <Column field="ageCategoryId" header="ID" />
                    <Column field="name" header="Наименование" />
                </DataTable>
                <Dialog visible={this.state.displayDialog} style={{ 'width': '380px' }} header="Возрастная категория" modal={true} footer={dialogFooter} onHide={() => this.setState({ displayDialog: false })}>
                    {
                        this.state.agecategory &&

                        <div className="p-grid p-fluid">
                            <div><label htmlFor="name">Наименование</label></div>
                            <div>
                                <InputText id="name" onChange={(e) => { this.updateProperty('name', e.target.value) }} value={this.state.agecategory.name} />
                            </div>

                        </div>
                    }
                </Dialog>
            </div>
        )
    }
}

// // Делает массив agecategory доступным в props
function mapStateToProps(state) {
    return {
        agecategory: state.agecategory.agecategory,
        loading: state.agecategory.loading,
        errors: state.agecategory.errors,
        forceReload:state.agecategory.forceReload
    }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(AgeCategoryPage);