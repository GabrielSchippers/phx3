import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';



@Injectable()
export class DataService {
    
 
    
  constructor(private http: Http, private router: Router) {
      
      }
  
       status(status){
           
           switch(status){
            case '1':
                status = 'Draft';
            break; 
            case '2':
                status = 'Published';
            break;           
           }
           
           return status;
        }
           
      courseName(cat){
        let catName = '';
        switch(cat){
            case '1':
                catName = 'Explain Pain';
            break;
             case '2':
                catName = 'Graded Motor Imagery';
            break;
             case '3':
                catName = 'Clinical Applications: Lower limb and lumbar spine';
            break;
             case '4':
                catName = 'Neurodynamics and the Neuromatrix';
            break;
             case '5':
                catName = 'Mobilisation of the Neuroimmune System';
            break;
             case '6':
                catName = 'Clinical Applications: Upper limb, thorax and neck';
            break;
             case '7':
                catName = 'Sensitive Nervous System';
            break;
             case '8':
                catName = 'The Problem Patient';
            break;
             case '9':
                catName = 'Current Concepts in Pain Science';
            break;
             case '10':
                catName = 'Pain, Plasticity and Rehabilitation';
            break;
             case '11':
                catName = 'Clinical Applications of Neurodynamics: ‘Peripheral’ Neuropathic Expressions';
            break;
             case '12':
                catName = 'Schmerzen Verstehen';
            break;
             case '13':
                catName = 'Mobilisation des Nervensystems';
            break;
             case '14':
                catName = 'Klinische Anwendungen: Untere Extremität und LWS';
            break;
             case '15':
                catName = 'Klinische Anwendungen: Obere Extremität, Thorax und HWS';
            break;
             case '16':
                catName = 'Das Sensitive Nervensystem';
            break;
             case '17':
                catName = 'Graduierte Motorische Vorstellung';
            break;
             case '18':
                catName = 'Interaktionen mit Problematischen (Schmerz)- Patienten';
            break;
             case '19':
                catName = 'Movilización del Sistema Nervioso';
            break;
             case '20':
                catName = 'Explicando el Dolor';
            break;
             case '21':
                catName = 'Neurodynamics y la Neuromatrix';
            break;
             case '22':
                catName = 'Mobilizzazione del Sistema Nervoso';
            break;
             case '23':
                catName = 'Applicazione Clinica: Arto Inferiore';
            break;
             case '24':
                catName = 'Spiegare Dolore';
            break;
             case '25':
                catName = 'Explicando a Dor';
            break;
             case '26':
                catName = 'Mobilizacao do Sistema Nervoso';
            break;
            
            
        }
        
        return catName;
      }


      removeCart(i){
          let newCart = [];
          let cart = JSON.parse(localStorage.getItem("cart"));
          for (var _i = 0; _i < cart.length; _i++) {
            if(i == _i) continue;
            newCart.push(cart[_i]);
          }
          localStorage.setItem("cart", JSON.stringify(newCart));
       }
       
      getCart(){
          let cart = JSON.parse(localStorage.getItem("cart"));
           
          return cart;
      }
      
     saveCart(cart){
           localStorage.setItem("cart", JSON.stringify(cart));
      }
    
      addToCart(product){
          let cart = JSON.parse(localStorage.getItem("cart"));
          if(!cart) cart = [];
          var found = false;
          for (var _i = 0; _i < cart.length; _i++) {
             if(cart[_i].id == product.id){
                 found = true;
                 cart[_i].qty = parseInt(cart[_i].qty) + parseInt(product.qty);
              }
              
          }
          if(!found)cart.push(product);
          
          localStorage.setItem("cart", JSON.stringify(cart));
         
       }

       stripeCart(cart){
          let items = [];
            
           for (var _i = 0; _i < cart.length; _i++) {
               let item = {
                   type: 'sku',
                   quantity: cart[_i].qty,
                   parent: cart[_i].skus.data[0].id
               };
               
               items.push(item);
           }
           
           
          
                          
              
           return items;
       }
       
       subtotal(cart){
           console.log(cart);
           let price = 0;
           for (var _i = 0; _i < cart.length; _i++) {
                price = price + (cart[_i].skus.data[0].price * cart[_i].qty);
           }



           return price;
       }
       
       
       getTotals(order){
            console.log('recalculating!');
            let stripeCart = this.stripeCart(order.cart);
            
            let payload      = {cart: stripeCart, shipping: order.shipping, user: order.user, charge: false}
            let headers      = new Headers({ 'Content-Type': 'application/json; charset=UTF-8'});  
            let options      = new RequestOptions({ headers: headers });  
            
            return this.http.post('http://13.55.59.91:8080/order', payload, options).map((res:Response) => {
               
                return res.json();
            });
       }
       
       
        placeOrder(order){
           console.log('placing order!');
            let stripeCart = this.stripeCart(order.cart);
            
            let payload      = {cart: stripeCart, shipping: order.shipping, user: order.user, payment: order.payment, charge: true}
            let headers      = new Headers({ 'Content-Type': 'application/json; charset=UTF-8'});  
            let options      = new RequestOptions({ headers: headers });  
            
            return this.http.post('http://13.55.59.91:8080/order', payload, options).map((res:Response) => {
                return res.json();
            });
       }

       upload(formData){
                var eVal = 'tk!';
                
                return new Promise((resolve, reject) => {
                    
                    var xhr = new XMLHttpRequest();
                    xhr.upload.addEventListener("progress", (ev: ProgressEvent) => {
                        console.log(ev);
                    });
                    
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == XMLHttpRequest.DONE) {
                            var resp = JSON.parse(xhr.responseText);
                            resolve(resp);
                         }
                    }
                    
                    xhr.open("POST", "http://13.55.59.91:8080/upload", true);
                    xhr.send(formData);
                    
                });
                
       }
   
     listCourses() {
       let payload      = { }
       let headers      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });  
       let options      = new RequestOptions({ headers: headers });  
     
     return this.http.post('http://13.55.59.91:8080/courses/list', payload, options).map((res:Response) => {
            var responseData = res.json();
                var result = [];
                 console.log(responseData);
                for (let item in responseData.data) {
                    // Turn to array
                    result.push({
                        data: responseData.data[item],
                        
                    });
                }
            return result;
        });
    }
    
    
     listResources() {
       let payload      = { }
       let headers      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });  
       let options      = new RequestOptions({ headers: headers });  
     
     return this.http.post('http://13.55.59.91:8080/resources/list', payload, options).map((res:Response) => {
            var responseData = res.json();
                var result = [];
                 console.log(responseData);
                for (let item in responseData.data) {
                    // Turn to array
                    result.push({
                        data: responseData.data[item],
                        
                    });
                }
            return result;
        });
    }

    
    
 
    
    
    
    login(email,password) {
       let payload      = { 
           email: email,
           password: password
       }
        let headers      = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });  
       let options      = new RequestOptions({ headers: headers });  
     
     return this.http.post('http://13.55.59.91:8080/login', payload, options).map((res:Response) => {
            var responseData = res.json();
            return responseData;
        });
    }
    
    
    storeLogin(login){
        localStorage.setItem("login", JSON.stringify(login));
        //console.log(JSON.parse(localStorage.getItem("login")));
    }
    
    isLoggedin(test = null) {
   
        return !!localStorage.getItem('login');
    }
    
    currentUser(){
        return JSON.parse(localStorage.getItem('login'));
    }
    
    isStaff(){
      
        var temp = JSON.parse(localStorage.getItem('login'));
         
        if(temp.IsStaff === true) return true;
        return false;
    }
    
    isHost(){
         var temp = JSON.parse(localStorage.getItem('login'));
        if(temp.IsCourseHost === true) return true;
        return false;
    }
    
    isInstructor(){
         var temp = JSON.parse(localStorage.getItem('login'));
        if(temp.IsFaculty === true) return true;
        return false;
    }
    
    logout(){
        localStorage.removeItem('login');
    }
    
    
    signup(signup) {
       let payload      = { 
           signup: signup,
           
       }
        let headers      = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });  
       let options      = new RequestOptions({ headers: headers });  
     
     return this.http.post('http://13.55.59.91:8080/signup', payload, options).map((res:Response) => {
            var responseData = res.json();
            return responseData;
        });
    }
    
    
     createUser(user) {
       let payload      = { 
           user: user,
           
       }
        let headers      = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });  
       let options      = new RequestOptions({ headers: headers });  
     
     return this.http.post('http://13.55.59.91:8080/users/create', payload, options).map((res:Response) => {
            var responseData = res.json();
            return responseData;
        });
    }

    
    
    editUser(user) {
       let payload      = { 
           user: user,
           
       }
        let headers      = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });  
       let options      = new RequestOptions({ headers: headers });  
     
     return this.http.post('http://13.55.59.91:8080/users/edit', payload, options).map((res:Response) => {
            var responseData = res.json();
            return responseData;
        });
    }
    
    
    
     editProduct(product) {
       let payload      = { 
           product: product,
           
       }
        let headers      = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });  
       let options      = new RequestOptions({ headers: headers });  
     
     return this.http.post('http://13.55.59.91:8080/products/edit', payload, options).map((res:Response) => {
            var responseData = res.json();
            return responseData;
        });
    }


    
    
    
       listUsers(page, pageSize) {
       let payload      = { 
           page: page,
           pageSize: pageSize
       }
       
       
       let headers      = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });  
       let options      = new RequestOptions({ headers: headers });  
     
     return this.http.post('http://13.55.59.91:8080/users/list', payload, options).map((res:Response) => {
            var responseData = res.json();
                var result = {
                    count: responseData.total,
                    data: []
                }
                console.log(responseData);
                for (let item in responseData.data) {
                    // Turn to array
                    result.data.push({
                        data: responseData.data[item],
                        
                    });
                }
            return result;
        });
    }
    
    
     listProducts(page, pageSize) {
       let payload      = { 
           page: page,
           pageSize: pageSize
       }
       
       
       let headers      = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });  
       let options      = new RequestOptions({ headers: headers });  
     
     return this.http.post('http://13.55.59.91:8080/products/list', payload, options).map((res:Response) => {
            var responseData = res.json();
                var result = {
                    count: responseData.total,
                    data: []
                }
                console.log(responseData);
                for (let item in responseData.data) {
                    // Turn to array
                    result.data.push({
                        data: responseData.data[item],
                        
                    });
                }
            return result;
        });
    }

     getProducts() {
        
       var payload = {}
       
       let headers      = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });  
       let options      = new RequestOptions({ headers: headers });  
     
     return this.http.post('http://13.55.59.91:8080/getProducts', payload, options).map((res:Response) => {
            var responseData = res.json();
            
            
            
            return responseData.data.data;
        });
    }
    
    
     getProduct(payload) {
        
      
       
       let headers      = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });  
       let options      = new RequestOptions({ headers: headers });  
     
     return this.http.post('http://13.55.59.91:8080/getProduct', payload, options).map((res:Response) => {
            var responseData = res.json();
            console.log(responseData);
            
            
            return responseData.data;
        });
    }




    
     searchUsers(query, page, pageSize) {
       let payload      = { 
           query: query,
           page: page,
           pageSize: pageSize
            
       }
       
       
       let headers      = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });  
       let options      = new RequestOptions({ headers: headers });  
     
     return this.http.post('http://13.55.59.91:8080/users/search', payload, options).map((res:Response) => {
            var responseData = res.json();
                var result = {
                    count: responseData.total,
                    data: []
                }
                console.log(responseData);
                for (let item in responseData.data) {
                    // Turn to array
                    result.data.push({
                        data: responseData.data[item],
                        
                    });
                }
            return result;
        });
    }



    getUser(id) {
       let payload      = { 
           id: id,
           
       }
        let headers      = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });  
       let options      = new RequestOptions({ headers: headers });  
     
     return this.http.post('http://13.55.59.91:8080/users/detail', payload, options).map((res:Response) => {
            var responseData = res.json();
            return responseData;
        });
    }
    
    
     

    
     search(payload) {
       
        let headers      = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });  
       let options      = new RequestOptions({ headers: headers });  
     
     return this.http.post('http://13.55.59.91:8080/search', payload, options).map((res:Response) => res.json() );
    }
    
    
      delete(payload) {
       
        let headers      = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });  
       let options      = new RequestOptions({ headers: headers });  
     
     return this.http.post('http://13.55.59.91:8080/delete', payload, options).map((res:Response) => {
            var responseData = res.json();
            return responseData;
        });
    }



    
      save(payload) {
       
        let headers      = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });  
       let options      = new RequestOptions({ headers: headers });  
     
     return this.http.post('http://13.55.59.91:8080/save', payload, options).map((res:Response) => {
            var responseData = res.json();
            return responseData;
        });
    }
    
    
     dropComment(payload) {
       
        let headers      = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });  
       let options      = new RequestOptions({ headers: headers });  
     
     return this.http.post('http://13.55.59.91:8080/dropComment', payload, options).map((res:Response) => {
            var responseData = res.json();
            return responseData;
        });
    }

    
    



}


