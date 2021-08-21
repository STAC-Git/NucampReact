class Student {
    constructor(name, email, community) {
        this.name = name;
        this.email = email;
        this.community = community;
    }
}
class Bootcamp {
    constructor(name, level, students=[]) {
        this.name = name;
        this.level = level;
        this.students = students;
    }

    registerStudent(studentToRegister) {
        const matchedStudents = this.students.filter(student => student.email === studentToRegister.email);
        if(matchedStudents.length > 0) {
            console.log("This email is already registered.");
        } else {
            this.students.push(studentToRegister);
            console.log(`Registering ${studentToRegister.email} to the bootcamp ${this.name}`);
        }
        return this.students;
    }

}