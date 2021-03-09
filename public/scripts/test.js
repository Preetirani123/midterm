const calculateEstimatedWait = () => {
  const url = `/sms/`;
  $.ajax({

    url: url,
    type: "GET",
    success: (data) => {
      console.log(req.body.Body)
      console.log(data)
      return data
    },
    error: (error) => {
      console.log(error.responseText);
    },
  });

  }

  calculateEstimatedWait();
