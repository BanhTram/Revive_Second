var app = angular.module('myApp', ['ngRoute', 'angularUtils.directives.dirPagination']);

app.controller('myController', function ($scope, $location) {
    $scope.ListClass = [
        { name: 'Lop', parentID: 0, prefix: '' },
        { name: 'Lop 11', parentID: 11, prefix: '' },
        { name: 'Lop 11A', parentID: 11, prefix: '__' },
        { name: 'Lop 11B', parentID: 11, prefix: '__' },
        { name: 'Lop 12A1', parentID: 12, prefix: '____' },
        { name: 'Lop 12A2', parentID: 12, prefix: '____' },
        { name: 'Lop 11C', parentID: 11, prefix: '__' },
        { name: 'Lop 12', parentID: 12, prefix: '' },
        { name: 'Lop 12B', parentID: 12, prefix: '__' },
        { name: 'Lop 10', parentID: 10, prefix: '' },
        { name: 'Lop 11A1', parentID: 11, prefix: '____' },
        { name: 'Lop 11A2', parentID: 11, prefix: '____' },
        { name: 'Lop 10A2', parentID: 10, prefix: '____' },
        { name: 'Lop 10A1', parentID: 10, prefix: '____' }
    ];

    $scope.students = [
        { name: 'Nam', age: new Date(2004, 01, 01), klass: 'Lop 10A1' },
        { name: 'Bede', age: new Date(2006, 01, 01), klass: 'Lop 10A2' },
        { name: 'Hoho', age: new Date(2003, 01, 01), klass: 'Lop 10A2' },
        { name: 'Kaka', age: new Date(2002, 01, 01), klass: 'Lop 11A1' },
        { name: 'Benben', age: new Date(2004, 01, 01), klass: 'Lop 11A2' },
        { name: 'Lunu', age: new Date(2006, 01, 01), klass: 'Lop 12A1' },
        { name: 'Lpaa', age: new Date(2001, 01, 01), klass: 'Lop 12A2' }
    ];

    $scope.classes = [
        { name: "Lop 10A1", belong: "Lop 10" },
        { name: "Lop 10A2", belong: "Lop 10" },
        { name: "Lop 11A1", belong: "Lop 11" },
        { name: "Lop 11A2", belong: "Lop 11" },
        { name: "Lop 12A1", belong: "Lop 12" },
        { name: "Lop 12A2", belong: "Lop 12" }
    ];

    $scope.calculateAge = function (birthdate) {
        return (new Date().getFullYear()) - (new Date(birthdate).getFullYear());
    }

    $scope.studentDefault = $scope.students.slice();
    $scope.inputDataSearch = {};

    $scope.search = function () {
        var tempName = $scope.inputDataSearch.name;
        var tempAge = $scope.inputDataSearch.age;
        var tempKlass = $scope.inputDataSearch.klass;

        $scope.students = angular.copy(_.filter($scope.studentDefault,
            function (student) {
                return ((tempAge === null || tempAge === undefined) || (tempAge !== null && tempAge !== undefined && $scope.calculateAge(student.age) == tempAge)) &&
                    ((tempKlass === null || tempKlass === undefined) || (tempKlass !== null && tempKlass !== undefined && student.klass.includes(tempKlass))) &&
                    ((tempName === null || tempName === undefined) || (tempName !== null && tempName !== undefined && student.name.includes(tempName)));
            }));
    };

    $scope.addStudent = function () {
        $location.path('/addStudent');
    }

    $scope.saveAddStudent = function (name, age, klass) {
        if (
        (name != null || name != undefined) && 
        (age != null || age != undefined) && 
        (klass != null || klass != undefined)
        ) {
            var tempStudent = {name: name, age: $scope.calculateAge(age), klass: klass};
            
            $scope.students.push(tempStudent);
            $scope.studentDefault.push(tempStudent);
            
            $location.path('/student');
            
        }
    }

    $scope.editStudent = function (student) {
        $scope.student = student;
        $location.path('/editStudent');
    }

    $scope.saveEditStudent = function (name, age, klass) {
        if ((name != null || name != undefined) && (age != null || age != undefined) && (klass != null || klass != undefined)) {
            var index = $scope.studentDefault.indexOf(name);

            $scope.studentDefault.splice(index, 1);
            $scope.studentDefault.push({ name: name, age: age, class: klass });

            $location.path('/student');
        }
    }

    $scope.deleteStudent = function (students) {
        var index = $scope.students.indexOf(students);
        
        $scope.students.splice(index, 1);
        $scope.studentDefault = $scope.students.slice();
    }

    // $scope.addClass = function () {
    //     $location.path('/addClass');
    // }

    // $scope.saveAddClass = function (name) {
    //     if (name != null || name != undefined) {
    //         $scope.classes.push({ name: name, belong: '' });
    //         $location.path('/class');
    //     }
    // }

    // $scope.editClass = function (classroom) {
    //     $scope.class = classroom;
    //     $location.path('/editClass');
    // }

    // $scope.saveEditClass = function (name) {
    //     if (name != null || name != undefined) {
    //         $location.path('/class');
    //     }
    // }

    // $scope.deleteClass = function (classroom) {
    //     var index = $scope.classes.indexOf(classroom);
    //     $scope.classes.splice(index, 1);
    // }
});
