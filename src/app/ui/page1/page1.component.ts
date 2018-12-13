import { Component, OnInit } from '@angular/core';
import * as ml5 from '../../../../node_modules/ml5/dist/ml5.min.js';
import { SortablejsOptions } from 'angular-sortablejs';

declare var ml5: any;
@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {
  scrollableOptions: SortablejsOptions;
  items = [];
  isHomePage: Boolean;
  isImgTextConfiged: Boolean;
  classifier;
  amountOfItem1: string;
  amountOfItem2: string;
  res: string;
  totalLoss;
  loss: string;
  amountOfItem1Images;
  amountOfItem2Images;
  gotResults;
  itemTitle;
  constructor() {
    this.scrollableOptions = {
      onUpdate: (event: any) => {
        console.log(event);
      }
    };
  }

  ProceedTraining() {
    this.isImgTextConfiged = true;
  }

  item1Btn(name, index) {
    this.classifier.addImage(name);
    this.itemTitle[index].total = this.itemTitle[index].total + 1;
  }

  
item2Btn() {
  this.classifier.addImage('Bottle');
  this.amountOfItem2 = (Number(this.amountOfItem2) + 1).toString();
}

train() {
  var me = this;
  this.classifier.train(function(lossValue) {
    if (lossValue) {
      me.totalLoss = lossValue;
      me.loss = 'Loss: ' + me.totalLoss;
    } else {
      me.loss = 'Done Training!\n Final Loss: ' + me.totalLoss;
    }
  });
}

save() {
  this.classifier.save();
}

addRow(index) {
  var imagePath = "../../../assets/img";
  this.itemTitle.push({id:"item" + index, name: "", total: 0, process: [{url:imagePath+"/start.png", name: "Start"}, {url:imagePath+"/sound.png", name: "Sound"}, {url:imagePath+"/sms.png", name: "SMS"}, {url:imagePath+"/email.jpg", name: "Email"}, {url:imagePath+"/end.png", name: "End"}]});
}

predict() {
  this.classifier.classify(this.gotResults);
}
  
  ngOnInit() {
    this.isImgTextConfiged = false;
    var imagePath = "../../../assets/img";
    this.items = [{url:imagePath+"/start.png", name: "Start"}, {url:imagePath+"/sound.png", name: "Sound"}, {url:imagePath+"/sms.png", name: "SMS"}, {url:imagePath+"/email.jpg", name: "Email"}, {url:imagePath+"/end.png", name: "End"}];
    this.isHomePage = false;
    this.amountOfItem1 = "0";
    this.amountOfItem2 = "0";
    this.loss = "Total Loss: -";
    var video: HTMLVideoElement = <HTMLVideoElement> document.getElementById('video');
    var loading = document.getElementById('loading');
    this.itemTitle = [{id:"item0", total: 0, process: this.items}];
    this.res = "...";

// A variable to store the total loss
  this.totalLoss = 0;

// Create a webcam capture
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
    video.src = window.URL.createObjectURL(stream);
    video.play();
  });
}

// A function to be called when the model has been loaded
function modelLoaded() {
  loading.innerText = 'Model loaded!';
}

// Extract the already learned features from Mobilenet
const featureExtractor = new ml5.featureExtractor('Mobilenet', modelLoaded);
// Create a new classifier using those features
this.classifier = featureExtractor.classification(video);

// A function to show the results and loop
this.gotResults = (data, res) => {
  document.getElementById("result").innerHTML = res;
  if (res.toLowerCase() == "close" ||res.toLowerCase() == "closed"){
    var audio = <HTMLAudioElement>document.getElementById("audio");
    audio.play();
  }
  this.classifier.classify(this.gotResults);
}

  }

}
