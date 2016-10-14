(function () {
  var app = angular.module('classes_studentsApp')

  app.filter('length', function () {
    return function (arr) {
      return arr.length;
    }
  });
  app.filter('classGradeAvg', function ($rootScope) {
    return function (curClass) {
      if (curClass == undefined) {
        return 7;
      }
      if (typeof curClass == 'string'){
        curClass = JSON.parse(curClass)
      }
      var total = 0;
      curClass.students.forEach(function (student) {
        total += student.grade;
      })

      return parseInt(total / curClass.students.length)
    }
  })
  app.filter('allStudents', function() {
    return function (arr) {
      var out = [];
      arr.forEach(function (curClass) {
        out.push(curClass.students)
      })
      return out.reduce(function(a, b) {
          return a.concat(b);
        }, []);
    }
  })
  app.filter('gradeLetter', function () {
    return function (num) {
      var out;
      switch (parseInt(num / 3)) {
        case 0:
          out = "F" + letterExt(num)
          break;
        case 1:
          out = "D" + letterExt(num)
          break;
        case 2:
          out = "C" + letterExt(num)
          break;
        case 3:
          out = "B" + letterExt(num)
          break;
        case 4:
          out = "A" + letterExt(num)
          break;
        default:
          out = "C"
          break;
      }
      return out;
    }
  });

  app.controller('mainCtrl', function ($rootScope) {
    $rootScope.classes = [{
      className: "Math",
      students: [{name: "Austin", grade: 8}, {name: "Gina", grade: 11}],
      teacher: "Wes"}]
  })

  app.controller('Classes', function ($rootScope) {
    this.classes = $rootScope.classes;
    this.minusGrade = function (student) {
      if (student.grade > 0){
        student.grade--;
      }
    }
    this.addGrade = function (student) {
      if (student.grade < 14){
        student.grade++;
      }
    }
  })
  app.controller('New', function ($rootScope) {
    this.classes = $rootScope.classes;

    this.classSubmit = function () {
      this.classes.push({className: this.className, teacher: this.teacher, students: [], avg:0})
    }

    this.studentSubmit = function () {
      this.classes[this.class].students.push({name: this.studentName, grade: 7})
    }
  })
  app.controller('Stats', function ($rootScope) {
    this.classes = $rootScope.classes;
    this.class = this.classes[0];
    console.log(this);
  })
})();

function letterExt(num) {
  if(num % 3 == 0){
    return "-";
  } else if (num % 3 == 2) {
    return "+"
  }
  return "";
}
