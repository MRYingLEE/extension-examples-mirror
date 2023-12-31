import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ICommandPalette } from '@jupyterlab/apputils';

import {
  ITranslator,
  nullTranslator,
  TranslationBundle
} from '@jupyterlab/translation';

import { DataGrid, DataModel } from '@lumino/datagrid';

import { StackedPanel } from '@lumino/widgets';

/**
 * Initialization data for the extension1 extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: '@jupyterlab-examples/datagrid:plugin',
  description:
    'Minimal JupyterLab extension to display a datagrid as a Lumino widget.',
  autoStart: true,
  requires: [ICommandPalette, ITranslator],
  activate: (
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    translator: ITranslator
  ) => {
    const { commands, shell } = app;
    const trans = translator.load('jupyterlab');

    const command = 'examples:datagrid';
    commands.addCommand(command, {
      label: trans.__('Open a Datagrid'),
      caption: trans.__('Open a Datagrid Panel'),
      execute: () => {
        const widget = new DataGridPanel();
        shell.add(widget, 'main');
      }
    });
    palette.addItem({ command, category: 'Extension Examples' });
  }
};

export default extension;

class DataGridPanel extends StackedPanel {
  constructor(translator?: ITranslator) {
    super();
    this._translator = translator || nullTranslator;
    this._trans = this._translator.load('jupyterlab');

    this.addClass('jp-example-view');
    this.id = 'datagrid-example';
    this.title.label = this._trans.__('Datagrid Example View');
    this.title.closable = true;

    const model = new LargeDataModel();
    const grid = new DataGrid();
    grid.dataModel = model;

    this.addWidget(grid);
  }

  private _translator: ITranslator;
  private _trans: TranslationBundle;
}

class LargeDataModel extends DataModel {
  rowCount(region: DataModel.RowRegion): number {
    return region === 'body' ? 1000000000000 : 2;
  }

  columnCount(region: DataModel.ColumnRegion): number {
    return region === 'body' ? 1000000000000 : 3;
  }

  data(region: DataModel.CellRegion, row: number, column: number): any {
    if (region === 'row-header') {
      return `R: ${row}, ${column}`;
    }
    if (region === 'column-header') {
      return `C: ${row}, ${column}`;
    }
    if (region === 'corner-header') {
      return `N: ${row}, ${column}`;
    }
    return `(${row}, ${column})`;
  }
}
