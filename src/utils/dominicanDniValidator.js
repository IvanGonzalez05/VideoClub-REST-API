// Validator devoloped by Victor Abreu: https://gist.github.com/ViCMAP/55260ffd138fe150040d

exports.validate = (dni) => {
    var d = dni.replace(/-/g, '');
    var newDni = d.substr(0, d.length - 1);
    var validator = d.substr(d.length - 1, 1);
    var sum = 0;

    if (dni.length < 11) {
        return false;
    }
    for (i = 0; i < newDni.length; i++) {
        mod = '';
        if (i % 2 == 0) {
            mod = 1;
        } else {
            mod = 2;
        }

        res = newDni.substr(i, 1) * mod;

        if (res > 9) {
            res = res.toString();
            one = res.substr(0, 1);
            two = res.substr(1, 1);
            res = eval(one) + eval(two);
        }
        sum += eval(res);
    }
    number = (10 - (sum % 10)) % 10;

    if (number == validator && newDni.substr(0, 3) != '000') {
        return true; // valid DNI
    } else {
        return false; // invalid DNI
    }
};
