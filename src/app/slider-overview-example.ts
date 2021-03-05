import { Component } from "@angular/core";

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

  tiles: Tile[] = [
    { cols: 4, rows: 1, text: "energy  ", disabled: true },
    { cols: 4, rows: 1, text: "F0      ", disabled: true },
    { cols: 4, rows: 1, text: "duration", disabled: true }
  ];

  synthesize() {
    this.loader = true;
    setTimeout(() => (this.loader = false), 3000);
  }
}

export interface Tile {
  cols: number;
  rows: number;
  text: string;
  disabled: boolean;
}

/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
