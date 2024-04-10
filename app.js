
//this is the code for the homepage contains the navigation buttons like on every page and lets you save the usersname
customElements.define("page-home", class extends HTMLElement {
    connectedCallback() {
        this.innerHTML =`
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-title>Health Inform</ion-title>
                </ion-toolbar>
            </ion-header>

            <ion-row>
                <ion-col size="auto" class="ion-text-center">
                    <ion-button href="#/" expands="block" color="primary">Home</ion-button>
                </ion-col>
                <ion-col size="auto" class="ion-text-center">
                    <ion-button href="#/conditions" expands="block" color="primary">Conditions</ion-button>
                </ion-col>
                <ion-col size="auto" class="ion-text-center">
                    <ion-button href="#/info" expands="block" color="primary">Information</ion-button>
                </ion-col>
            </ion-row>
            <ion-card>
                <ion-card-content>
                    <p>Welcome to the Health Inform application</p>
                    <p>The purpose of this application is to help inform users on different mediacal conditions by helping them learn synonyms for them by querying an API </p>
                </ion-card-content>
            </ion-card>
            <ion-content>
				<ion-card>
					<ion-input type = "text" id = "SaveName" placeholder= "Enter name here: "> </ion-input>
					<ion-button onclick="SaveUserName()">Save Name</ion-button>
				</ion-card>
            </ion-content>
            <ion-card>
					<ion-card-content>
						<ion-img src = "./Pictures/Head.jpg" alt="Image of Brain with puzzle pieces coming out of it"></ion-img>
						
					</ion-card-content>
				</ion-card>
        `;
    }
});
//this saves the inputed username
function SaveUserName(){
    
	const UserName = document.getElementById("SaveName")
	localStorage.setItem("UserName", UserName.value)

	//console.log(UserName.value)

}
//this retrieves the usersname
const name = localStorage.getItem("UserName")


//this is the conditions page html where you can query conditions to find alterante 
//names for them and displays the saved username from the home page
customElements.define("page-conditions", class extends HTMLElement {
    connectedCallback() {
        this.innerHTML =`
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-title>Health Inform</ion-title>
                </ion-toolbar>
            </ion-header>
            
            <ion-row>
                <ion-col size="auto" class="ion-text-center">
                    <ion-button href="#/" expands="block" color="primary">Home</ion-button>
                </ion-col>
                <ion-col size="auto" class="ion-text-center">
                    <ion-button href="#/conditions" expands="block" color="primary">Conditions</ion-button>
                </ion-col>
                <ion-col size="auto" class="ion-text-center">
                    <ion-button href="#/info" expands="block" color="primary">Information</ion-button>
                </ion-col>
            </ion-row>

            <ion-content>
                <ion-card>
                    <ion-card-content>
                        <p>Here you can enter a medical condition and alternate names of it will be dispalyed to the right</p>
                        <p></p>
                    </ion-card-content>
                    <ion-card-content>
                        <ion-input type="text" id="searchInput" placeholder="Enter condition name"></ion-input>
                        <ion-button onclick="fetchName()">Get Name </ion-button>
                        <ion-item>
                            <ion-label>Hello ${name} you might have this condition: </ion-label>
                            <ion-list id="consumerName"></ion-list>
                        </ion-item>
                    </ion-card-content>
                </ion-card>
                <ion-card>
					
				</ion-card>
				<ion-card>
					<ion-card-content>
						<ion-img src = "./Pictures/Head.jpg" alt="Image of Brain with puzzle pieces coming out of it"></ion-img>
						
					</ion-card-content>
				</ion-card>
			</ion-content>	
        `;
    }
});



//this gets the input form the user for the primary name of a condition
function fetchName() {
    const primary_name = document.getElementById('searchInput').value.trim();
//checks if user inputs anything, if not throws error
    if (primary_name === '') {
        alert('Please enter a condition name.');
        return;
    }
//thios makes the APi url a variable
    const url = `https://clinicaltables.nlm.nih.gov/api/conditions/v3/search?terms=${primary_name}&df=term_icd9_code,primary_name`;
	//this fetches the data from the API, data found from insomnia 3rd party application
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
		//this clears the list for newly searched data using the destroy children function
        .then(data => {
			destroyChildren();
        	extractConsumerName(data);
        })
		//catches an error if there is one
        .catch(error => {
            console.error('There was a problem', error);
        });
}
//loops throught the array and creates a HTML item for each loop
function extractConsumerName(data) {
    // finds and selects the element htmlList
    const htmlList = document.getElementById('consumerName')
    //assigns value of 4 elements of data to the array
	const List = data[3];
	//loops for number of object in the array and appends the data to the output list
	for(let i = 0; i < List.length; i ++){
		const name = List [i][1]
		const newItem = document.createElement('ion-item');
		newItem.textContent = name;
		htmlList.appendChild(newItem)
	}

}
//this is a function to destroy the appended children on the list
function destroyChildren() {

	const htmlList = document.getElementById('consumerName')
	htmlList.textContent = ""

}
//this is the information page on the web app
customElements.define("page-info", class extends HTMLElement {
    connectedCallback() {
        this.innerHTML =`
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-title>Health Inform</ion-title>
                </ion-toolbar>
            </ion-header>
            
            <ion-row>
                <ion-col size="auto" class="ion-text-center">
                    <ion-button href="#/" expands="block" color="primary">Home</ion-button>
                </ion-col>
                <ion-col size="auto" class="ion-text-center">
                    <ion-button href="#/conditions" expands="block" color="primary">Conditions</ion-button>
                </ion-col>
                <ion-col size="auto" class="ion-text-center">
                    <ion-button href="#/info" expands="block" color="primary">Information</ion-button>
                </ion-col>
            </ion-row>
                    <ion-card-content>
						<p>This application was built with sustainability in mind, this appliaction helps user inform themselves in order to better knowledge on health.
                        all of the conditions here can be found on the NHS website to help you make further discoveries about various health conditions.</p>
						
					</ion-card-content>
                    <ion-card-content>
						<p>this image is of the caduceus, a staff with two snakes coiled around it, is the official insignia of the United States Medical Corps, Navy Pharmacy Division, and the Public Health Service. The caduceus is also the magic wand carried by Hermes (the Romans knew him as Mercury), the messenger of the gods.</p>
						
					</ion-card-content>
            
            
            <ion-content>
                <ion-card>
					<ion-card-content>
						<ion-img src = "./Pictures/Head.jpg" alt="Image of Brain with puzzle pieces coming out of it"></ion-img>
						
					</ion-card-content>
				</ion-card>
            </ion-content>

        `;
    }
});

