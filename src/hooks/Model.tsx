class model_class {

  dispatch: any = null
  get_dispatch = () => this.dispatch == null ? false : this.dispatch
  set_dispatch = (n_dispatch: any) => { this.dispatch = n_dispatch }

  setData = (label: string, payload: any) => {
    this?.dispatch({ type: 'SET_STORE', label, payload })
  }

  resetData = () => {
    this?.dispatch({ type: 'RESET_DATA' })
  }
}

export default new model_class();