import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { actionCreators } from '../store/ReservationStatus';
import { ExportCSV } from './ExportCSV';


class ReservationStatusPage extends Component {

    constructor() {
        super();
        this.state = {};
        this.onReservationStatusSelect = this.onReservationStatusSelect.bind(this);
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
        this.props.requestReservationStatus();
    }

    updateProperty(property, value) {
        let reservationstatus = this.state.reservationstatus;
        reservationstatus[property] = value;
        this.setState({ reservationstatus: reservationstatus });
    }

    onReservationStatusSelect(e) {
        this.newReservationStatus = false;
        this.setState({
            displayDialog: true,
            reservationstatus: Object.assign({}, e.data)
        });
    }

    dialogHide() {
        this.setState({ displayDialog: false });
    }

    addNew() {
        this.newReservationStatus = true;
        this.setState({
            reservationstatus: { name: '' },
            displayDialog: true
        });
    }

    save() {
        this.props.saveReservationStatus(this.state.reservationstatus);
        this.dialogHide();
        this.growl.show({ severity: 'success', detail: this.newReservationStatus ? "Сохранено" : "Обновлено" });
    }

    delete() {
        this.props.deleteReservationStatus(this.state.reservationstatus.reservationStatusId);
        this.dialogHide();
        this.growl.show({ severity: 'error', detail: "Данные удалены" });
    }

    render() {

        let header = <div className="p-clearfix" style={{ width: '100%' }}>
            <Button style={{ background: 'rgba(0, 170, 204, 1)', float: 'left' }} label="Добавить" onClick={this.addNew} />
            <ExportCSV csvData={this.props.reservationstatus} fileName={'Статусы бронирования'} />
        </div>;

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            <Button style={{ background: 'rgba(0, 170, 204, 1)' }} label="Сохранить" onClick={this.save} />
            <Button style={{ background: 'rgba(242, 12, 108, 1)' }} label="Удалить" disabled={this.newReservationStatus ? true : false} onClick={this.delete} />
        </div>;

        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <h2 style={{ color: 'rgba(80, 86, 89, 1)', marginBottom: '50px', marginTop: '50px' }}>Статус бронирования</h2>
                <DataTable value={this.props.reservationstatus} selectionMode="single" header={header} selection={this.state.selectedReservationStatus} onSelectionChange={e => this.setState({ selectedReservationStatus: e.value })} onRowSelect={this.onReservationStatusSelect}>
                    <Column field="reservationStatusId" header="ID" />
                    <Column field="name" header="Наименование" />
                    <Column field="comment" header="Комментарий" />
                </DataTable>
                <Dialog visible={this.state.displayDialog} style={{ 'width': '380px' }} header="Статус бронирования" modal={true} footer={dialogFooter} onHide={() => this.setState({ displayDialog: false })}>
                    {
                        this.state.reservationstatus &&

                        <div className="p-grid p-fluid">
                            <div><label htmlFor="name">Наименование</label></div>
                            <div>
                                <InputText id="name" onChange={(e) => { this.updateProperty('name', e.target.value) }} value={this.state.reservationstatus.name} />
                            </div>
                            <div><label htmlFor="comment">Комментарий</label></div>
                            <div>
                                <InputTextarea id="comment" rows={5} cols={30} value={this.state.reservationstatus.comment} onChange={(e) => { this.updateProperty('comment', e.target.value) }} autoResize={true} />
                            </div>
                        </div>
                    }
                </Dialog>
            </div>
        )
    }
}

// // Делает массив reservationstatus доступным в props
function mapStateToProps(state) {
    return {
        reservationstatus: state.reservationstatus.reservationstatus,
        loading: state.reservationstatus.loading,
        errors: state.reservationstatus.errors,
        forceReload:state.reservationstatus.forceReload
    }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ReservationStatusPage);