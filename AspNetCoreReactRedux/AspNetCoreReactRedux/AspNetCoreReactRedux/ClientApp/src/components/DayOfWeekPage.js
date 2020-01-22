import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { actionCreators } from '../store/DayOfWeek'; 


class DayOfWeekPage extends Component {

    constructor() {
        super();
        this.state = {};
        this.onDayOfWeekSelect = this.onDayOfWeekSelect.bind(this);
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
        this.props.requestDayOfWeek();
    }

    updateProperty(property, value) {
        let dayofweek = this.state.dayofweek;
        dayofweek[property] = value;
        this.setState({ dayofweek: dayofweek });
    }

    onDayOfWeekSelect(e) {
        this.newDayOfWeek = false;
        this.setState({
            displayDialog: true,
            dayofweek: Object.assign({}, e.data)
        });
    }

    dialogHide() {
        this.setState({ displayDialog: false });
    }

    addNew() {
        this.newDayOfWeek = true;
        this.setState({
            dayofweek: { name: '' },
            displayDialog: true
        });
    }

    save() {
        this.props.saveDayOfWeek(this.state.dayofweek);
        this.dialogHide();
        this.growl.show({ severity: 'success', detail: this.newDayOfWeek ? "Сохранено" : "Обновлено" });
    }

    delete() {
        this.props.deleteDayOfWeek(this.state.dayofweek.dayOfWeekId);
        this.dialogHide();
        this.growl.show({ severity: 'error', detail: "Данные удалены" });
    }

    render() {

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            <Button style={{ background: 'rgba(0, 170, 204, 1)' }} label="Сохранить" onClick={this.save} />
            <Button style={{ background: 'rgba(242, 12, 108, 1)' }} label="Удалить" disabled={this.newDayOfWeek ? true : false} onClick={this.delete} />
        </div>;

        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <h2 style={{ color: 'rgba(80, 86, 89, 1)', marginBottom: '50px', marginTop: '50px' }}>Дни недели</h2>
                <DataTable value={this.props.dayofweek} selectionMode="single" selection={this.state.selectedDayOfWeek} onSelectionChange={e => this.setState({ selectedDayOfWeek: e.value })} onRowSelect={this.onDayOfWeekSelect}>
                    <Column field="dayOfWeekId" header="ID" />
                    <Column field="name" header="Наименование" />
                </DataTable>
                <Dialog visible={this.state.displayDialog} style={{ 'width': '380px' }} header="День недели" modal={true} footer={dialogFooter} onHide={() => this.setState({ displayDialog: false })}>
                    {
                        this.state.dayofweek &&

                        <div className="p-grid p-fluid">
                            <div><label htmlFor="name">Наименование</label></div>
                            <div>
                                <InputText id="name" onChange={(e) => { this.updateProperty('name', e.target.value) }} value={this.state.dayofweek.name} />
                            </div>

                        </div>
                    }
                </Dialog>
            </div>
        )
    }
}

// // Делает массив dayofweek доступным в props
function mapStateToProps(state) {
    return {
        dayofweek: state.dayofweek.dayofweek,
        loading: state.dayofweek.loading,
        errors: state.dayofweek.errors,
        forceReload:state.dayofweek.forceReload
    }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(DayOfWeekPage);