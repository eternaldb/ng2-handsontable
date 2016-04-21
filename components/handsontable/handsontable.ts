import {OnInit, OnDestroy, Component, EventEmitter, ElementRef, Input} from 'angular2/core';

// declare var Handsontable:Function;



@Component({
  selector: 'hot-table',
  template:`<h1>smartform</h1>`,
  outputs:this.eventNames
})
export class HotTable implements OnInit, OnDestroy {
  private inst:any;
  private view:any;

  @Input() data:Array<any> = [];
  @Input() colHeaders:Array<string>;
  @Input() columns:Array<any>;
  @Input() colWidths:Array<number>;
  @Input() options:any;

  eventNames:Array<string> = ['afterCellMetaReset', 'afterChange',
    'afterCreateCol', 'afterCreateRow', 'afterDeselect',
    'afterDestroy', 'afterDocumentKeyDown', 'afterGetCellMeta', 'afterGetColHeader', 'afterGetRowHeader',
    'afterInit', 'afterIsMultipleSelectionCheck', 'afterLoadData',
    'afterMomentumScroll', 'afterOnCellCornerMouseDown',
    'afterOnCellMouseDown', 'afterOnCellMouseOver', 'afterRemoveCol', 'afterRemoveRow', 'afterRender',
    'afterRenderer', 'afterScrollHorizontally', 'afterScrollVertically',
    'afterSelection', 'afterSelectionByProp',
    'afterSelectionEnd', 'afterSelectionEndByProp', 'afterSetCellMeta', 'afterUpdateSettings', 'afterValidate',
    'beforeAutofill', 'beforeCellAlignment', 'beforeChange', 'beforeChangeRender', 'beforeDrawBorders',
    'beforeGetCellMeta', 'beforeInit', 'beforeInitWalkontable', 'beforeKeyDown', 'beforeOnCellMouseDown',
    'beforeRemoveCol', 'beforeRemoveRow', 'beforeRender', 'beforeSetRangeEnd', 'beforeTouchScroll',
    'beforeValidate', 'construct', 'init', 'modifyCol', 'modifyColWidth', 'modifyRow', 'modifyRowHeight',
    'persistentStateLoad', 'persistentStateReset', 'persistentStateSave'];

  constructor(private element:ElementRef) {
    // fill events dynamically
    this.eventNames.forEach(eventName => {
      this[eventName] = new EventEmitter();
    });
  }

  parseAutoComplete(column, dataSet) {
    let inst = this.inst;

    if (typeof column.source === 'string') {
      let relatedField:string = column.source;
      column.source = function (query, process) {
        let row:number = inst.getSelected()[0];
        let data:any = dataSet[row];

        if (!data) {
          return;
        }

        let fieldParts:Array<string> = relatedField.split('.');
        let o:any = data;
        for (let i = 0; i < fieldParts.length; i++) {
          o = o[fieldParts[i]];
        }

        process(o.map(item => {
          return !column.optionField ? item : item[column.optionField];
        }));
      };
    }
  }

  ngOnInit() {
    // this.view = document.createElement('div');
    // this.view.class = 'handsontable-container';
    // this.element.nativeElement.appendChild(this.view);

    /*let htOptions:any = {
      data: this.data
    };

    this.eventNames.forEach(eventName => {
      htOptions[eventName] = data => {
        this[eventName].next(data);
      };
    });

    let additionalFields:Array<string> = ['colHeaders', 'colWidths', 'columns'];
    additionalFields.forEach(field => {
      if (this[field]) {
        Object.assign(htOptions, {
          [field]: this[field]
        });
      }
    });

    if (this.options) {
      Object.assign(htOptions, this.options);
    }

    this.inst = Handsontable(this.view, htOptions);

    if (this.columns && this.columns.length) {
      this.columns.forEach(column => {
        this.parseAutoComplete(column, this.data);
      });
    }*/
  }

  ngOnDestroy() {
    if (this.view) {
      this.view.remove();
    }
  }
}

// export const handsontable:Array<any> = [HotTable];
