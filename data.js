function getAllData()
{
    $.ajax({

        type: "GET",
        //tên API
        url: "http://localhost:8080/home/cities/list",
        success: function (data) {
            let content = "";
            if (data !== undefined) {
                for (let i = 0; i < data.length;i++)
                {
                    content += getCityList(data[i]);
                }
            }
            document.getElementById("cityList").innerHTML = content;
        }
    });
}
function getCityList(data)
{
    return `<td>${data.id}</td><td>${data.cityName}</td>
             <td>${data.country.countryName}</td><td>${data.cityArea}</td><td>${data.cityPopulation}
             <td>${data.cityGDP}</td><td>${data.cityDescribe}</td><td><a href="" onclick="infoCity(${data.id})">Chỉnh sửa</a></td>
                  <td><a href="" onclick="deleteCity(${data.id})">Xoá</a></td>`;
}
function infoCity(id)
{
    // goi ajax
    $.ajax({

        // Loại phương thức
        type: "GET",
        //tên API

        url: "http://localhost:8080/home/cities/infoCity/"+id,


        //xử lý khi thành công
        // Hiển thị thông tin city
        success: function (data)
        {
            localStorage.setItem("id", data.id);
            localStorage.setItem("cityName", data.cityName);
            localStorage.setItem("country", data.country);
            localStorage.setItem("cityArea", data.cityArea);
            localStorage.setItem("cityPopulation", data.cityPopulation);
            localStorage.setItem("cityGDP", data.cityGDP);
            localStorage.setItem("cityDescribe", data.cityDescribe);
            window.location.href = "edit.html";
        }
    });
}
function deleteCity(data)
{
    if (confirm('Are you sure you want to delete this?')) {
        // goi ajax
        $.ajax({
            type: "DELETE",
            //tên API
            url: `http://localhost:8080/home/cities/deleteCity/${data}`,
            //xử lý khi thành công

            success:getAllData

        });
        //chặn sự kiện mặc định của thẻ
        event.preventDefault();
    }
}


