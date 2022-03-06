<template>
  <div class="mb-3 container">
    <div>
      <span class="text1">online Form covid-19</span>
    </div>
    <label for="exampleFormControlInput1" class="form-label">กรอกข้อมูล</label>
    <form @submit.prevent="addData">
      <div class="row">
        <div class="col-3">
          <label>Name</label>
          <input
            type="text"
            class="form-control"
            required
            placeholder="name"
            v-model="name1"
          />
        </div>
        <div class="col-3">
          <label for="">lastname</label>
          <input
            type="text"
            class="form-control"
            required
            placeholder=""
            v-model="lastname1"
          />
        </div>
        <div class="col-3">
          <label for="">E-mail</label>
          <input
            type="email"
            class="form-control"
            required
            placeholder=""
            v-model="mails"
          />
        </div>
        <div class="col-3">
          <label for="">ATK Test</label>
          <select
            class="form-select form-control"
            aria-label="Default select example"
            required
            v-model="checkedNames"
          >
            <option value="positive">positive</option>
            <option value="negative">negative</option>
          </select>
        </div>
        <div class="col-3">
          <label for="startDate" class="form-label">Date</label>
          <input
            id="startDate"
            class="form-control"
            placeholder="date"
            type="date"
            v-model="datee"
            required
          />
        </div>
        <div class="col-3">
          <label for="startDate" class="form-label">tel</label>
          <input
            id="te"
            class="form-control"
            type="tel"
            v-model="numberphone"
            required
          />
        </div>
      </div>
      <div class="row mt-2">
        <!-- <div class="col-1">
          <button @click="readData()" type="button" class="btn btn-warning">
            ดูข้อมูล
          </button>
        </div> -->
        <div class="col-2">
          <button type="submit" class="btn btn1">เสร็จสิ้น</button>
        </div>
      </div>
    </form>
    <h4>{{ dbData }}</h4>
    <table class="table">
      <thead>
        <tr>
          <td class="table-primary">ลำดับ</td>
          <td class="table-secondary">ชื่อ</td>
          <td class="table-success">นามสกุล</td>
          <td class="table-danger">ATK</td>
          <td class="table-dark">Date</td>
          <td class="table-warning">E-mail</td>
          <td class="table-info">เบอร์โทรศัพท์</td>
        </tr>
      </thead>
      <tbody v-for="(item, index) in table" :key="index">
        <tr>
          <th scope="row">{{ index + 1 }}</th>

          <td>{{ item.data.name }}</td>
          <td>{{ item.data.lastname }}</td>
          <td>{{ item.data.atk }}</td>
          <td>{{ item.data.date }}</td>
          <td>{{ item.data.mail }}</td>
          <td>{{ item.data.number }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import db from "../plugins/firebaseInit";
import { collection, addDoc, query, onSnapshot } from "firebase/firestore";

export default {
  beforeMount() {
    this.readData();
  },
  data() {
    return {
      dbData: "",
      name1: " ",
      lastname1: "",
      checkedNames: "",
      mails: "",
      numberphone: "",
      date: "",
      table: [],
    };
  },
  methods: {
    async addData() {
      this.table = [];
      try {
        const docRef = await addDoc(collection(db, "noteCovid"), {
          name: this.name1,
          lastname: this.lastname1,
          atk: this.checkedNames,
          date: this.datee,
          mail: this.mails,
          number: this.numberphone,
        });
        this.name1 = "";
        this.lastname1 = "";
        this.checkedNames = "";
        this.datee = "";
        this.mails = "";
        this.numberphone = "";

        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    readData() {
      this.table = [];
      const q = query(collection(db, "noteCovid"));
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.table.push({ id: doc.id, data: doc.data() });
        });
        // console.log("Current cities in CA: ", this.csDoc.join(", "));
      });
    },
    /* addit() {
      this.table.push({ id: doc.id, data: doc.data() });
      this.additems.push({
        text: this.name1,
      });
    },*/
  },
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
  font-family: sans-serif;
}
.text1 {
  font-size: 60px;
  font-weight: 700;
  letter-spacing: 8px;
  margin-bottom: 20px;
  position: relative;
  animation: text 3s 1;
}

@keyframes text {
  0% {
    color: rgb(87, 0, 248);
    margin-bottom: -40px;
  }
  30% {
    letter-spacing: 25px;
    margin-bottom: -40px;
  }
  85% {
    letter-spacing: 8px;
    margin-bottom: -40px;
  }
}
.btn {
  border: 1px solid #3498db;
  background: none;
  padding: 10px 20px;
  font-size: 20px;
  font-family: "montserrat";
  cursor: pointer;
  margin: 10px;
  transition: 0.8s;
  position: relative;
  overflow: hidden;
}
.btn1,
.btn2 {
  color: #3498db;
}
.btn3,
.btn4 {
  color: rgb(30, 82, 33);
}
.btn1:hover,
.btn2:hover {
  color: rgb(82, 231, 117);
}
.btn3:hover,
.btn4:hover {
  color: #20581b;
}
.btn::before {
  content: "";
  position: absolute;
  left: 0;
  width: 100%;
  height: 0%;
  background: #14861a;
  z-index: -1;
  transition: 0.8s;
}
.btn1::before,
.btn3::before {
  top: 0;
  border-radius: 0 0 50% 50%;
}
.btn2::before,
.btn4::before {
  bottom: 0;
  border-radius: 50% 50% 0 0;
}
.btn3::before,
.btn4::before {
  height: 180%;
}
.btn1:hover::before,
.btn2:hover::before {
  height: 180%;
}
.btn3:hover::before,
.btn4:hover::before {
  height: 0%;
}
</style>
