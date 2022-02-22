const express = require("express");
const router = express.Router();
const gov_code = require("../../governorate-code.json")

// check that the ID does not contain characters
function validateDateAllNumbers(id) {
    for (var i = 0; i < id.length; i++) {
        if (id.charAt(i) < '0' || id.charAt(i) > '9') {
            return false;
        }
    }
    return true;
}

// check that the ID contains valid date of birth
function validateDate(id) {
    var century = parseInt(id.charAt(0));
    if(century<2){
        return null;
    }
    century += 17;
    //cut the string from index 1 to 2 iclusive, to get the year
    var year = id.substring(1, 3);

    //concat the year tot the century to get the correct year
    var fullyear = (century + year);

    //parse the string values to the corresponding year, month and day
    fullyear = parseInt(fullyear);
    var month = parseInt(id.substring(3, 5));
    var day = parseInt(id.substring(5, 7));
    const date = new Date(fullyear + "/" + month + "/" + (day));

    //check if the returned value from the parsed date is a valid one and make sure that it did not exceed the current date
    if (isNaN(date) || (!isNaN(date) && date > (new Date()))) {
        return null;
    }
    return {"year":date.getFullYear(),"month":date.getMonth()+1, "day":date.getDate()};
}

// check that the ID contains valid governorate code and extract it
function validateGovernorate(id) {
    var code = id.substring(7, 9);
    if (gov_code[code]) {
        const gov = { "code": code, "governorate": gov_code[code] };
        return gov;
    } else {
        return null;
    }
}
//call functions above to check the validity of the id
// const validateID= (req, res, next)=> {

//     return next();
// }

router.get("/:id", (req, res) => {
    //extract the ID from the request url
    const id = req.params.id;
    if (!validateDateAllNumbers(id)) {
        return res.status(400).json({ msg: "The ID must not contain characters" });
    }
    if (id.length != 14) {
        return res.status(400).json({ msg: "The ID is not 14 digits in length" });
    }
    if (id.charAt(13) =='0') {
        return res.status(400).json({ msg: "The ID is invalid" });
    }
    //extract the date of birth
    const dob = validateDate(id);
    if (!dob) {
        return res.status(400).json({ msg: "The ID contains invalid date of birth" });
    }
    //get the governorate that corresponds to the entered code
    const gov = validateGovernorate(id);
    if (!gov) {
        return res.status(400).json({ msg: "The ID contains invalid governorate code" })
    }
    var gender= 'male'
    if(parseInt(id.charAt(12))%2==0)
    {
        gender= 'female'
    }
    const data = { "date of birth": dob, "governorate": gov, "gender":gender };
    return res.status(200).json(data)

})

module.exports= router;