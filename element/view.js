const template = document.create("element");
view.innerHTML = `
	<style>
		* {
			box-sizing: border-box;
		}

		[class*="col-"] {
			float: left;
		}

		.row::after {
			content: "";
			clear: both;
			display: table;
		}

		[class*="col-"] {
			width: 100%;
		}

		@media only screen and (min-width: 0px) {
			.col-sm-0 {width: 0%;       height:0px;   opacity:0;}
			.col-sm-1 {width: 8.33%;    height:auto;  opacity:1;}
			.col-sm-2 {width: 16.66%;   height:auto;  opacity:1;}
			.col-sm-3 {width: 25%;      height:auto;  opacity:1;}
			.col-sm-4 {width: 33.33%;   height:auto;  opacity:1;}
			.col-sm-5 {width: 41.66%;   height:auto;  opacity:1;}
			.col-sm-6 {width: 50%;      height:auto;  opacity:1;}
			.col-sm-7 {width: 58.33%;   height:auto;  opacity:1;}
			.col-sm-8 {width: 66.66%;   height:auto;  opacity:1;}
			.col-sm-9 {width: 75%;      height:auto;  opacity:1;}
			.col-sm-10 {width: 83.33%;  height:auto;  opacity:1;}
			.col-sm-11 {width: 91.66%;  height:auto;  opacity:1;}
			.col-sm-12 {width: 100%;    height:auto;  opacity:1;}
		}

		@media only screen and (min-width: 600px) {
			.col-md-0 {width: 0%;       height:0px;   opacity:0;}
			.col-md-1 {width: 8.33%;    height:auto;  opacity:1;}
			.col-md-2 {width: 16.66%;   height:auto;  opacity:1;}
			.col-md-3 {width: 25%;      height:auto;  opacity:1;}
			.col-md-4 {width: 33.33%;   height:auto;  opacity:1;}
			.col-md-5 {width: 41.66%;   height:auto;  opacity:1;}
			.col-md-6 {width: 50%;      height:auto;  opacity:1;}
			.col-md-7 {width: 58.33%;   height:auto;  opacity:1;}
			.col-md-8 {width: 66.66%;   height:auto;  opacity:1;}
			.col-md-9 {width: 75%;      height:auto;  opacity:1;}
			.col-md-10 {width: 83.33%;  height:auto;  opacity:1;}
			.col-md-11 {width: 91.66%;  height:auto;  opacity:1;}
			.col-md-12 {width: 100%;    height:auto;  opacity:1;}
		}

		@media only screen and (min-width: 768px) {
			.col-lg-0 {width: 0%;       height:0px;   opacity:0;}
			.col-lg-1 {width: 8.33%;    height:auto;  opacity:1;}
			.col-lg-2 {width: 16.66%;   height:auto;  opacity:1;}
			.col-lg-3 {width: 25%;      height:auto;  opacity:1;}
			.col-lg-4 {width: 33.33%;   height:auto;  opacity:1;}
			.col-lg-5 {width: 41.66%;   height:auto;  opacity:1;}
			.col-lg-6 {width: 50%;      height:auto;  opacity:1;}
			.col-lg-7 {width: 58.33%;   height:auto;  opacity:1;}
			.col-lg-8 {width: 66.66%;   height:auto;  opacity:1;}
			.col-lg-9 {width: 75%;      height:auto;  opacity:1;}
			.col-lg-10 {width: 83.33%;  height:auto;  opacity:1;}
			.col-lg-11 {width: 91.66%;  height:auto;  opacity:1;}
			.col-lg-12 {width: 100%;    height:auto;  opacity:1;}
		}

		.ui-array-input-item {
			 border: 1px solid #a9a9a9;
			 padding:14px;
			 margin-top:5px;
			 font-size:1em;
		 }

		.ui-array-input-item-delete {
			height:37px;
			width:44px;
			margin-left:-44px;
			margin-top:1em;
			background-color:transparent;
			border-color:transparent;
			color:lightGray;
			cursor:pointer;
		}

		.ui-array-input-button-add {
			margin-top:5px;
			padding:10px;
			height:44px;
			background-color:#fff;
			border: 1px solid #a9a9a9;
			color:gray;
			font-size:1em;
			cursor:pointer;
		}

	</style>
	<div id="ui-array-input-container" class="col-12-lg col-md-12 col-sm-12">
		<div class="ui-array-input-item-array">
		</div>
		<input class="ui-array-input-item col-lg-12 col-md-12 col-sm" placeholder="DEFAULT" ></input>
		<button class="ui-array-input-button-add col-12-lg col-mg-12 col-sm-12">Add Item </button>
	</div>
`
export default view;
