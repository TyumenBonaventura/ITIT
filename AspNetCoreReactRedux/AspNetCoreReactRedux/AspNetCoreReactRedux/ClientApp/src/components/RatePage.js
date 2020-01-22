import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { actionCreators } from '../store/Rate.js';
import { ExportCSV } from './ExportCSV';

class RatePage extends Component {

    constructor() {
        super();
        this.state = {
            rate: [],
            dayofweek: [],
            equipmenttype: [],
        }  
        this.onRateSelect = this.onRateSelect.bind(this);
        this.dialogHide = this.dialogHide.bind(this);
        this.addNew = this.addNew.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.fetchDataRate();
        this.fetchDataDayOfWeek();
        this.fetchDataEquipmentType();
    }

    componentDidUpdate() {
        // Этот метод вызывается при изменении параметров маршрута
        if (this.props.forceReload) {
            this.fetchDataRate();
            this.fetchDataDayOfWeek();
            this.fetchDataEquipmentType();
        }
    }

    fetchDataRate() {
        this.props.requestRate();
    }

    fetchDataDayOfWeek() {
        this.props.requestDayOfWeek();
    }

    fetchDataEquipmentType() {
        this.props.requestEquipmentType();
    }

    updateProperty(property, value) {
        let rate = this.state.rate;
        rate[property] = value;
        this.setState({ rate: rate});
    }

    onRateSelect(e) {
        this.newRate = false;
        this.setState({
            displayDialog: true,
            rate: Object.assign({}, e.data)
        });
    }

    dialogHide() {
        this.setState({ displayDialog: false });
    }

    addNew() {
        this.newRate = true;
        this.setState({
            rate: { dayOfWeekId: '', price: '', equipmentTypeId: '' },
            dayofweek: { dayOfWeekId: '', name: '' },
            equipmenttype: { equipmentTypeId: '', name: '' },
            displayDialog: true
        });
    }

    save() {
        this.props.saveRate(this.state.rate);
        this.dialogHide();
        this.growl.show({ severity: 'success', detail: this.newRate ? "Сохранено" : "Обновлено" });
    }

    delete() {
        this.props.deleteRate(this.state.rate.rateId);
        this.dialogHide();
        this.growl.show({ severity: 'error', detail: "Удалено" });
    }

    render() {

        let header = <div className="p-clearfix" style={{ width: '100%' }}>
            <Button style={{ background: 'rgba(0, 170, 204, 1)', float: 'left' }} label="Добавить" onClick={this.addNew} />
            <ExportCSV csvData={this.props.rate} fileName={'Тарифы'} />
        </div>;

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            <Button style={{ background: 'rgba(0, 170, 204, 1)' }} label="Сохранить" onClick={this.save} />
            <Button style={{ background: 'rgba(242, 12, 108, 1)' }} label="Удалить" disabled={this.newRate ? true : false} onClick={this.delete} />
        </div>;

        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <h2 style={{ color: 'rgba(80, 86, 89, 1)', marginBottom: '50px', marginTop: '50px' }}>Тарифы</h2>
                <DataTable value={this.props.rate} selectionMode="single" header={header} selection={this.state.selectedRate} onSelectionChange={e => this.setState({ selectedRate: e.value })} onRowSelect={this.onRateSelect} paginator={true} rows={10} rowsPerPageOptions={[5, 10, 20]}>
                    <Column field="rateId" header="ID" />
                    <Column field="equipmentTypeId" header="Тип инвентаря" />
                    <Column field="dayOfWeekId" header="День недели" />
                    <Column field="price" header="Цена" />
                </DataTable>
                <Dialog visible={this.state.displayDialog} style={{ 'width': '380px' }} header="Тариф" modal={true} footer={dialogFooter} onHide={() => this.setState({ displayDialog: false })}>
                    {
                        
                        this.state.rate && this.state.dayofweek && this.state.equipmenttype &&

                        <div className="p-grid p-fluid">
                            <div><label htmlFor="equipmenttype">Тип инвентаря</label></div>
                            <select onChange={(e) => { this.updateProperty('equipmentTypeId', e.target.value) }} value={this.state.rate.equipmentTypeId}>
                                <option value="">-- Тип инвентаря--</option>
                                {this.props.equipmenttype.map(equipmenttype =>
                                    <option key={equipmenttype.equipmentTypeId} value={equipmenttype.equipmentTypeId}>{equipmenttype.name}</option>
                                )}
                            </select> 
                            <div><label htmlFor="dayofweek">День недели</label></div>
                            <select onChange={(e) => { this.updateProperty('dayOfWeekId', e.target.value) }} value={this.state.rate.dayOfWeekId}>
                                <option value="">-- День недели --</option>
                                {this.props.dayofweek.map(dayofweek =>
                                    <option key={dayofweek.dayOfWeekId} value={dayofweek.dayOfWeekId}>{dayofweek.name}</option>
                                )}
                            </select>    
                            <div><label htmlFor="price">Цена за сутки</label></div>
                            <div>
                                <InputText id="price" onChange={(e) => { this.updateProperty('price', e.target.value) }} value={this.state.rate.price} />
                            </div>
                        </div>
                    }
                </Dialog>
            </div>
        )
    }
}

// Делает массив rate доступным в props
function mapStateToProps(state) {
    return {
        rate: state.rate.rate,
        dayofweek: state.rate.dayofweek,
        equipmenttype: state.rate.equipmenttype,
        loading: state.rate.loading,
        errors: state.rate.errors,
        forceReload:state.rate.forceReload
    }
}



export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(RatePage);