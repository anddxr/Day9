<template>
<div>
    <p>Search: <input type="text" v-model="search" placeholder="Some name"></p>
    <p>Id <input type="text" v-model="changeId" readonly></p>
    <p>Name: <input type="text" v-model="name" placeholder="New name"></p> 
    <p>Photo: <input type="text" v-model="photo" placeholder="photo URL"></p>
    <p>Group:
      <select v-model="group">
        <option>RPZ_16_2</option>
        <option>RPZ_16_1</option>
      </select>
    </p>
    <p>Pract:<input type="checkbox" v-model="isDonePr"></p>
    
    <button v-on:click="AddNewStud()">ADD NEW</button>
    <button v-on:click="UpdtById(changeId)">UPDATE</button>
    <div>
      <table class="table table-dark">
        <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Photo</th>
          <th scope="col">Name</th>
          <th scope="col">Group</th>
          <th scope="col">Date_of_birth</th>
          <th scope="col">Zdav</th>
        </tr>
        </thead>
     <!--   <tbody> -->
        <tr class="product" v-for="(item) in students" v-bind:key="item._id">
          <td>{{item._id}} </td>
          <td><img class="studImg" v-bind:src="item.photo"></td>
          <td v-bind="item.name.includes(search) && search != '' ? 'color:red' : '' "  >{{item.name}} </td>
          <td>{{item.group}} </td>
          <td>{{item.date_of_birth}}</td>
          <td><input type="checkbox" v-model="item.isDonePr"> </td>
          <td><button v-on:click = "DlStudentById(item._id)">Видалити</button> </td>
          <td>
            <div v-on:click = "UpdateData(item)">
              <i class="fa fa-pencil" aria-hidden="true" ></i>
            </div>
          </td>
        </tr>
      </table>
    </div>
</div>    
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios,axios)

export default {
    data: function() {
        return {    
      students: [],
      search:'',
      changeId:'',
      name:'',
      photo:'',
      group:'',
      isDonePr:false,
        }
    },
    mounted: function(){
      Vue.axios.get("http://46.101.212.195:3000/students").then((response) =>{
        console.log(response.data)
        this.students = response.data;
      })
    },
    methods: {
      clickme: function(id){
        alert("Ok");
        this.students = this.students.filter((element) => { 
          return element.id !== id;
        });
      },
      AddNewStud: function(){
        Vue.axios.post("http://46.101.212.195:3000/students",{
          name: this.name,
          photo: this.photo,
          group: this.group,
          isDonePr: this.isDonePr
        }).then((responce) => {
          this.students.push({
          name: this.name,
          photo: this.photo,
          group: this.group,
          isDonePr: this.isDonePr})
          console.log(responce.data)
        })
        
      },
      DlStudentById: function(st){
        console.log(st)
        Vue.axios.delete('http://46.101.212.195:3000/students/'+st).then(responce => {
            this.students = this.students.filter(Element => {return Element._id != st;
            });
        });
      },
      UpdtById: function(id){
        Vue.axios.put("http://46.101.212.195:3000/students/"+id,{
          name: this.name,
          photo: this.photo,
          group: this.group,
          isDonePr: this.isDonePr
        }).then((responce) => {
          console.log(responce.data)
        })
      },
      UpdateData: function(student){
        this.changeId = student._id
        this.name = student.name
        this.photo = student.photo
        this.group = student.group
        this.isDonePr = student.isDonePr
      }
    },
    }

</script>

<style>
.studImg{
    max-height: 50px;
    width: auto;
}
</style>