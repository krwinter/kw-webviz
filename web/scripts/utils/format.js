define([],
    function() {


        var format = {

            /*
            * Turn a date into an integer that can be used on x-axis, or date id
            * Ex. Tues. Feb 12, 2013 -> 20130212
            */
            dateToDateInt: function(inputDate) {

                var dateInt,
                    tmpDate;

                tmpDate = new Date(inputDate);

                dateInt = (tmpDate.getFullYear() * 10000) + (tmpDate.getMonth() * 100) + tmpDate.getDate();

                return dateInt;

            },

            timestampFromDate: function(dateString) {
                var dateObj = new Date(dateString);
                return Math.floor(dateObj.getTime() / 1000);
            },

            slashDateFromTimestamp: function(timestamp) {

                var dateSrc = String(timestamp).length === 10 ? timestamp * 1000 : timestamp
                var dateObj = new Date(dateSrc);
                return (dateObj.getMonth() + 1) + '/' + dateObj.getDate() + '/' + dateObj.getFullYear();

            },

            dateIdToUnixTime: function(inputDate) {

                var dateString,
                    year,
                    month,
                    day;

                dateString = String(inputDate);
                year = dateString.substr(0,4);
                month = dateString.substr(4,2);
                day = dateString.substr(6,2);

                return Math.floor(new Date(month + "/" + day + "/" + year).getTime() / 1000);
            },

            dateIdFromSlashDate: function(dateString) {
                var parts = dateString.split("/");
                return Number(parts[2] + parts[0] + parts[1]);
            },

            dateIdToSlashDate: function(dateId) {
                dateId = String(dateId);

                var year = dateId.substr(0,4),
                    month = dateId.substr(4,2),
                    day = dateId.substr(6,2);

                return month + '/' + day + '/' + year;
            },


        };


        return format;

    }
);
