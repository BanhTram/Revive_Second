var app = angular.module('myApp', ['ngRoute', 'angularUtils.directives.dirPagination']);

app.controller('myController', function ($scope, $location) {
    $scope.ListClass = [
        { id: 200, name: 'Lop 11', parentID: 11, prefix: '', level: 1 },
        { id: 199, name: 'Lop 11A', parentID: 11, prefix: '__', level: 2 },
        { id: 189, name: 'Lop 11B', parentID: 11, prefix: '__', level: 2 },
        { id: 299, name: 'Lop 12A', parentID: 12, prefix: '__', level: 2 },
        { id: 289, name: 'Lop 12B', parentID: 12, prefix: '__', level: 2 },
        { id: 179, name: 'Lop 11C', parentID: 11, prefix: '__', level: 2 },
        { id: 300, name: 'Lop 12', parentID: 12, prefix: '', level: 1 },
        { id: 288, name: 'Lop 12B', parentID: 12, prefix: '__', level: 2 },
        { id: 100, name: 'Lop 10', parentID: 10, prefix: '', level: 1 },
        { id: 189, name: 'Lop 11B1', parentID: 11, prefix: '____', level: 2 },
        { id: 189, name: 'Lop 11B2', parentID: 11, prefix: '____', level: 2 },
        { id: 189, name: 'Lop 10B2', parentID: 10, prefix: '____', level: 2 },
        { id: 189, name: 'Lop 10B1', parentID: 10, prefix: '____', level: 2 },
    ];

    $scope.students = [
        { name: 'Nam', age: new Date(2004, 01, 01), class: 'Lop 10A1' },
        { name: 'Bede', age: new Date(2006, 01, 01), class: 'Lop 10A2' },
        { name: 'Hoho', age: new Date(2003, 01, 01), class: 'Lop 10A2' },
        { name: 'Kaka', age: new Date(2002, 01, 01), class: 'Lop 11A1' },
        { name: 'Benben', age: new Date(2004, 01, 01), class: 'Lop 11A2' },
        { name: 'Lunu', age: new Date(2006, 01, 01), class: 'Lop 12A1' },
        { name: 'Lpaa', age: new Date(2001, 01, 01), class: 'Lop 12A2' }
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
        var tempClass = $scope.inputDataSearch.class;

        $scope.students = angular.copy(_.filter($scope.studentDefault,
            function (student) {
                return ((tempAge === null || tempAge === undefined) || (tempAge !== null && tempAge !== undefined && $scope.calculateAge(student.age) == tempAge)) &&
                    ((tempClass === null || tempClass === undefined) || (tempClass !== null && tempClass !== undefined && student.class.includes(tempClass))) &&
                    ((tempName === null || tempName === undefined) || (tempName !== null && tempName !== undefined && student.name.includes(tempName)));
            }));
    };

    $scope.addStudent = function () {
        $location.path('/addStudent');
    }

    $scope.saveAddStudent = function (name, age) {
        if ((name != null || name != undefined) && (age != null || age != undefined)) {
            $scope.students.push({ name: name, age: age, class: '' });
            $scope.studentDefault.push({ name: name, age: age, class: '' });
            $location.path('/student');
        }
    }

    $scope.editStudent = function (student) {
        $scope.student = student;
        $location.path('/editStudent');
    }

    $scope.saveEditStudent = function (name, age) {
        if ((name != null || name != undefined) && (age != null || age != undefined)) {
            var index = $scope.studentDefault.indexOf(name);

            $scope.studentDefault.splice(index, 1);
            $scope.studentDefault.push({ name: name, age: age, class: '' });

            $location.path('/student');
        }
    }

    $scope.deleteStudent = function (student) {
        var index = $scope.students.indexOf(student);
        $scope.students.splice(index, 1);
    }

    $scope.addClass = function () {
        $location.path('/addClass');
    }

    $scope.saveAddClass = function (name) {
        if (name != null || name != undefined) {
            $scope.classes.push({ name: name, belong: '' });
            $location.path('/class');
        }
    }

    $scope.editClass = function (classroom) {
        $scope.class = classroom;
        $location.path('/editClass');
    }

    $scope.saveEditClass = function (name) {
        if (name != null || name != undefined) {
            $location.path('/class');
        }
    }

    $scope.deleteClass = function (classroom) {
        var index = $scope.classes.indexOf(classroom);
        $scope.classes.splice(index, 1);
    }
});
