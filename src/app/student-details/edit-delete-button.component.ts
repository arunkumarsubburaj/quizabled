import { Component, OnDestroy } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
@Component({
  selector: 'edit-delete-cell-renderer',
  template: `
    <span
      class="material-icons btnIcon editIcon"
      data-action="showLog"
      title="Show Log"
    >
      text_snippet
    </span>
    <span
      class="material-icons btnIcon deleteIcon"
      data-action="resetLog"
      title="Reset Log"
    >
      lock_reset
    </span>
  `,
})
export class EditDeleteRenderer implements OnDestroy {
  private cellValue: any;
  private params!: ICellRendererParams;

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.cellValue = this.getValueToDisplay(params);
  }

  // gets called whenever the cell refreshes
  refresh(params: ICellRendererParams) {
    // set value into cell again
    this.cellValue = this.getValueToDisplay(params);
  }

  editQuestion() {
    console.log('Edit: ', this.cellValue);
    // this.params.
  }
  deleteQuestion() {
    console.log('Delete: ', this.cellValue);
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }

  ngOnDestroy() {
    // no need to remove the button click handler
    // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
  }
}
