module.exports.email = function(body) {
    return {
      Destination: {
        CcAddresses: [
          process.env.EMAIL,
        ],
        ToAddresses: [
          process.env.EMAIL,
        ]
      },
      Message: {
        Body: {
          Html: {
           Charset: "UTF-8",
           Data: body
          },
          Text: {
           Charset: "UTF-8",
           Data: body
          }
         },
         Subject: {
          Charset: 'UTF-8',
          Data: 'Ice Skate Notification'
         }
        },
      Source: process.env.EMAIL
    }
  };

  module.exports.sms = function(msg) {
    return {
      PhoneNumber: process.env.MOBILE,
      Message: msg
    }
  }

  module.exports.requestBody = function() {
    return {
      "activity_search_pattern": {
          "skills": [],
          "time_after_str": "",
          "days_of_week": null,
          "activity_select_param": 2,
          "center_ids": [],
          "time_before_str": "",
          "activity_category_ids": [
              "49"
          ],
          "date_before": "",
          "min_age": null,
          "date_after": "",
          "activity_type_ids": [],
          "site_ids": [],
          "for_map": false,
          "geographic_area_ids": [],
          "season_ids": [],
          "activity_department_ids": [],
          "activity_other_category_ids": [],
          "child_season_ids": [],
          "activity_keyword": "",
          "instructor_ids": [],
          "max_age": null
      },
      "activity_transfer_pattern": {}
    }
  }
