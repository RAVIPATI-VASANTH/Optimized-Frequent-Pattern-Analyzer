import React, { Component } from "react";
// import { Doughnut } from "react-chartjs-2";
import Chart from "react-apexcharts";
import "./../../../../css/brandsInfopanel.css";

export default class BrandInfoPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { brandsList: [], status: "", selectedCategory: {} };
  }

  componentDidMount() {
    fetch(
      `http://127.0.0.1:5000/getFPARequestBrandInfo?userId=${this.props.fpaActive.userId}&requestName=${this.props.fpaActive.requestName}`,
      { method: "POST" }
    ).then((res) =>
      res.json().then((res) => {
        if (res.message) {
          this.setState({
            brandsList: res.brandsInfo.brandsList,
            status: res.brandsInfo.status,
          });
        } else {
          console.log(res.text);
        }
      })
    );
  }

  getLabelsAndSeries(list) {
    let series = [];
    let labels = [];
    for (const [key, value] of Object.entries(list)) {
      labels.push(key);
      series.push(value);
    }
    return { series: series, labels: labels };
  }

  updateCategory(category) {
    for (var i = 0; i < this.state.brandsList.length; i++) {
      if (this.state.brandsList[i].categoryName === category) {
        let data = this.getLabelsAndSeries(this.state.brandsList[i].list);
        let obj = {
          ...this.state.brandsList[i],
        };
        this.setState({
          selectedCategory: obj,
        });
        break;
      }
    }
  }

  render() {
    let brandsInfo = <div></div>;
    let category = "None";
    if (this.state.brandsList.length !== 0) {
      brandsInfo = (
        <div className="brandsListInfoDiv">
          {this.state.brandsList.map((obj) => (
            <p
              className="eachCategory"
              onClick={() => this.updateCategory(obj.categoryName)}
            >
              {obj.categoryName}
            </p>
          ))}
        </div>
      );
    }

    if (Object.keys(this.state.selectedCategory).length !== 0) {
      category = this.state.selectedCategory.categoryName;
    }
    let data = { series: [], labels: [] };
    if (this.state.selectedCategory.list)
      data = this.getLabelsAndSeries(this.state.selectedCategory.list);
    return (
      <div className="brandsInfopanel">
        <div className="infoTags">
          <p className="infoBarLabels">Status : {this.state.status}</p>
          <p className="infoBarLabels">selected : {category}</p>
        </div>
        <div className="listedSelectedBrandItems">
          {brandsInfo}
          <div className="statisticDiv">
            <Chart
              type="donut"
              width="90%"
              height="90%"
              series={data.series}
              options={{
                labels: data.labels,
                title: { text: "" },
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
