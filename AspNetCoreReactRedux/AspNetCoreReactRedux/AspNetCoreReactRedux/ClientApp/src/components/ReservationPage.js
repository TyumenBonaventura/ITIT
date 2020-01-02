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
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { actionCreators } from '../store/Reservation';
import { Calendar } from 'primereact/calendar';
import { ExportCSV } from './ExportCSV';

class ReservationPage extends Component {

    constructor() {
        super();
        this.state = {
            reservation: [],
            user: [],
            reservationstatus: [],
            doctype: [],
        }  
        this.onReservationSelect = this.onReservationSelect.bind(this);
        this.dialogHide = this.dialogHide.bind(this);
        this.addNew = this.addNew.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.fetchDataReservation();
        this.fetchDataUser();
        this.fetchDataReservationStatus();
        this.fetchDataDocType();
    }

    componentDidUpdate() {
        // Этот метод вызывается при изменении параметров маршрута
        if (this.props.forceReload) {
            this.fetchDataReservation();
            this.fetchDataUser();
            this.fetchDataReservationStatus();
            this.fetchDataDocType();
        }
    }

    fetchDataReservation() {
        this.props.requestReservation();
    }

    fetchDataUser() {
        this.props.requestUser();
    }

    fetchDataReservationStatus() {
        this.props.requestReservationStatus();
    }

    fetchDataDocType() {
        this.props.requestDocType();
    }

    updateProperty(property, value) {
        let reservation = this.state.reservation;

        reservation[property] = value;

        this.setState({ reservation: reservation});
    }

    onReservationSelect(e) {
        this.newReservation = false;
        this.setState({
            displayDialog: true,
            reservation: Object.assign({}, e.data)
        });
    }

    dialogHide() {
        this.setState({ displayDialog: false });
    }

    addNew() {
        this.newReservation = true;
        this.setState({
            reservation: { userId: '', reservationStatusId: '', docTypeId: '', docNum: '', dateIssue: '', dateReturn: '', cost: '', comment: '' },
            user: { userId: '', fio: '' },
            reservationstatus: { reservationStatusId: '', name: '' },
            doctype: { docTypeId: '', name: '' },
            displayDialog: true
        });
    }

    save() {
        this.props.saveReservation(this.state.reservation);
        this.dialogHide();
        this.growl.show({ severity: 'success', detail: this.newReservation ? "Сохранено" : "Обновлено" });
    }

    delete() {
        this.props.deleteReservation(this.state.reservation.reservationId);
        this.dialogHide();
        this.growl.show({ severity: 'error', detail: "Удалено" });
    }

    render() {

        let header = <div className="p-clearfix" style={{ width: '100%' }}>
            <Button style={{ background: 'rgba(0, 170, 204, 1)', float: 'left' }} label="Добавить" onClick={this.addNew} />
            <ExportCSV csvData={this.props.reservation} fileName={'Бронирования'} />
        </div>;

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            <Button style={{ background: 'rgba(0, 170, 204, 1)' }} label="Сохранить" onClick={this.save} />
            <Button style={{ background: 'rgba(242, 12, 108, 1)' }} label="Удалить" disabled={this.newReservation ? true : false} onClick={this.delete} />
        </div>;

        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <h2 style={{ color: 'rgba(80, 86, 89, 1)', marginBottom: '50px', marginTop: '50px' }}>Бронирования</h2>
                <DataTable value={this.props.reservation} selectionMode="single" header={header} selection={this.state.selectedReservation} onSelectionChange={e => this.setState({ selectedReservation: e.value })} onRowSelect={this.onReservationSelect} paginator={true} rows={10} rowsPerPageOptions={[5, 10, 20]}>
                    <Column field="reservationId" header="ID" />
                    <Column field="userId" header="Клиент" />
                    <Column field="reservationStatusId" header="Статус бронирования" />
                    <Column field="docTypeId" header="Тип документа" />
                    <Column field="docNum" header="Номер документа" />
                    <Column field="dateIssue" header="Дата выдачи" />
                    <Column field="dateReturn" header="Дата возврата" />
                    <Column field="cost" header="Стоимость" />
                    <Column field="comment" header="Комментарий" />
                </DataTable>
                <Dialog visible={this.state.displayDialog} style={{ 'width': '380px' }} header="Бронирование" modal={true} footer={dialogFooter} onHide={() => this.setState({ displayDialog: false })}>
                    {
                        
                        this.state.reservation && this.state.user && this.state.reservationstatus && this.state.doctype &&

                        <div className="p-grid p-fluid">
                            
                            <div><label htmlFor="userId">Клиент</label></div>
                            <select onChange={(e) => { this.updateProperty('userId', e.target.value) }} value={this.state.reservation.userId}>
                                {this.props.user.map(user =>
                                    <option key={user.userId} value={user.userId}>{user.fio}</option>
                                )}
                            </select>
                            <div><label htmlFor="reservationState">Статус бронирования</label></div>
                            <select onChange={(e) => { this.updateProperty('reservationStatusId', e.target.value) }} value={this.state.reservation.reservationStatusId}>
                                <option value="">-- Выбрать статус --</option>
                                {this.props.reservationstatus.map(reservationstatus =>
                                    <option key={reservationstatus.reservationStatusId} value={reservationstatus.reservationStatusId}>{reservationstatus.name}</option>
                                )}
                            </select>
                            <div><label htmlFor="docType">Тип документа</label></div>
                            <select onChange={(e) => { this.updateProperty('docTypeId', e.target.value) }} value={this.state.reservation.docTypeId}>
                                <option value="">-- Выбрать тип документа --</option>
                                {this.props.doctype.map(doctype =>
                                    <option key={doctype.docTypeId} value={doctype.docTypeId}>{doctype.name}</option>
                                )}
                            </select>  
                            <div><label htmlFor="docNum">Номер документа</label></div>
                            <div>
                                <InputText id="docNum" onChange={(e) => { this.updateProperty('docNum', e.target.value) }} value={this.state.reservation.docNum} />
                            </div>
                            <div><label htmlFor="docNum">Дата выдачи</label></div>
                            <div>
                                <Calendar value={this.state.reservation.dateIssue} onChange={(e) => { this.updateProperty('dateIssue', e.target.value) }} showIcon={true} />
                            </div>
                            <div><label htmlFor="dateReturn">Дата возврата</label></div>
                            <div>
                                <Calendar value={this.state.reservation.dateReturn} onChange={(e) => { this.updateProperty('dateReturn', e.target.value) }} showIcon={true} />
                            </div>
                            <div><label htmlFor="cost">Стоимость</label></div>
                            <div>
                                <InputText id="cost" onChange={(e) => { this.updateProperty('cost', e.target.value) }} value={this.state.reservation.cost} />
                            </div>
                            <div><label htmlFor="comment">Комментарий</label></div>
                            <div>
                                <InputTextarea id="comment" rows={5} cols={30} value={this.state.reservation.comment} onChange={(e) => { this.updateProperty('comment', e.target.value) }} autoResize={true} />
                            </div>
                        </div>
                    }
                </Dialog>
            </div>
        )
    }
}

// Делает массив reservation доступным в props
function mapStateToProps(state) {
    return {
        reservation: state.reservation.reservation,
        user: state.reservation.user,
        reservationstatus: state.reservation.reservationstatus,
        doctype: state.reservation.doctype,
        loading: state.reservation.loading,
        errors: state.reservation.errors,
        forceReload:state.reservation.forceReload
    }
}



export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ReservationPage);