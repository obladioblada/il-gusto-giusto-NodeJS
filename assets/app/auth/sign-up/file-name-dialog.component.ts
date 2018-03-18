import {Component, EventEmitter, Output} from "@angular/core";
import {FileHolder} from "angular2-image-upload";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-file-name-dialog',
    template: `
        <h1 mat-dialog-title>CARICA FOTO</h1>
        <mat-dialog-content>
            <image-upload
                    [max]="1"
                    [extensions]="['jpg','png','gif','tiff']"
                    [buttonCaption]="'SELEZIONA FOTO'"
                    [dropBoxMessage]="'TRASCINA LA TUA FOTO'"
                    [clearButtonCaption]="'ELIMINA'"
                    [class]="'customClass'"
                    (uploadFinished)="onUploadFinished($event)"></image-upload>
        </mat-dialog-content>
        <mat-dialog-actions>
            <button mat-button type="button" mat-dialog-close>Cancel</button>
            <button mat-button (click)="onImageAdded()">Add</button>
        </mat-dialog-actions>
    `,
    styleUrls: ['./file-name-dialog.component.css']
})
export class FileNameDialogComponent {

    constructor(private authSercive: AuthService){}


    onUploadFinished(file: FileHolder) {
         console.log(file);
         this.authSercive.imageToUpload = file;
    };

    onImageAdded(){

    }
}