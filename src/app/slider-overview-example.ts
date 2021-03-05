import { ngAfterViewInit, Component, ViewChild } from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";

/**
 * @title Basic slider
 */
@Component({
  selector: "slider-overview-example",
  templateUrl: "slider-overview-example.html",
  styleUrls: ["slider-overview-example.css"]
})
export class SliderOverviewExample {
  checked = false;
  indeterminate = false;
  labelPosition: "before" | "after" = "after";
  loader: boolean = false;
  private sort: MatSort;
  selectedText: SelectedText= {'phrase':'', 'position':-1}

  ngAfterViewInit(){
    document.addEventListener('click',this.onAllClicks.bind(this))
  }

  onAllClicks(){
    if (document.getSelection()?.type == "None" || document.getSelection()?.type == "Caret"){ 
      this.selectedText.phrase= "";
    }
  }

  tiles: Tile[] = [
    { cols: 4, rows: 1, text: "energy  ", disabled: true, value: 0 },
    { cols: 4, rows: 1, text: "F0      ", disabled: true, value: 0 },
    { cols: 4, rows: 1, text: "duration", disabled: true, value: 0 }
  ];

  trackHighlightedText(){
    let anchorOffset= document.getSelection()?.anchorOffset || null;
    let focusOffset= document.getSelection()?.focusOffset || null;
    let phrase= document.getSelection()?.toString() || "";
    
    let position= -1
    if (anchorOffset && focusOffset){
      this.selectedText.position= Math.min(anchorOffset,focusOffset);
      this.selectedText.phrase= phrase;
      console.log(this.selectedText)
    }
  }

  AsyncData() {
    console.log('mpike')
    const energyVal= this.tiles[0].disabled ? "default" : this.tiles[0].value ;
    const f0Val= this.tiles[1].disabled ? "default" : this.tiles[1].value;
    const durationVal= this.tiles[2].disabled ? "default" : this.tiles[2].value;
    ELEMENT_DATA.push({
        phrase: this.selectedText.phrase + ' ' + this.selectedText.position,
        energy: energyVal,
        f0: f0Val,
        duration: durationVal,
        wav: 'wav',
    });

    this.loader = false;
  }

  synthesize() {
    this.loader = true;
    
    setTimeout( this.AsyncData.bind(this), 3000);
  }

  //table
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }
  setDataSourceAttributes() {
    this.dataSource.sort = this.sort;
  }
  displayedColumns: string[] = [
    "select",
    "phrase",
    "energy",
    "f0",
    "duration",
    "wav"
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${
      this.selection.isSelected(row) ? "deselect" : "select"
    } row ${row.position + 1}`;
  }
}

let ELEMENT_DATA: PeriodicElement[] = [];

export interface Tile {
  cols: number;
  rows: number;
  text: string;
  disabled: boolean;
  value: number;
}

export interface PeriodicElement {
  phrase: string;
  energy: number | string;
  f0: number | string;
  duration: number | string;
  wav: string;
}

export interface SelectedText {
  phrase: string;
  position: number;
}
/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
