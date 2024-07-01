function Dashboard() {
    return (
        <section>
            <div className="main-panel" >
                <div className="content-wrapper" >
                    <div className="row">
                        <div className="col-sm-6">
                            <h3 className="mb-0 font-weight-bold">Kenneth Osborne</h3>
                            <p>Your last login: 21h ago from newzealand.</p>
                        </div>
                        <div className="col-sm-6">
                            <div className="d-flex align-items-center justify-content-md-end">
                                <div className="mb-3 mb-xl-0 pr-1">
                                    <div className="dropdown">
                                        <button
                                            className="btn bg-white btn-sm dropdown-toggle btn-icon-text border mr-2"
                                            type="button"
                                            id="dropdownMenu3"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            <i className="typcn typcn-calendar-outline mr-2" />
                                            Last 7 days
                                        </button>
                                        <div
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuSizeButton3"
                                            data-x-placement="top-start"
                                        >
                                            <h6 className="dropdown-header">Last 14 days</h6>
                                            <a className="dropdown-item" href="#">
                                                Last 21 days
                                            </a>
                                            <a className="dropdown-item" href="#">
                                                Last 28 days
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="pr-1 mb-3 mr-2 mb-xl-0">
                                    <button
                                        type="button"
                                        className="btn btn-sm bg-white btn-icon-text border"
                                    >
                                        <i className="typcn typcn-arrow-forward-outline mr-2" />
                                        Export
                                    </button>
                                </div>
                                <div className="pr-1 mb-3 mb-xl-0">
                                    <button
                                        type="button"
                                        className="btn btn-sm bg-white btn-icon-text border"
                                    >
                                        <i className="typcn typcn-info-large-outline mr-2" />
                                        info
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row  mt-3"style={{marginLeft:'120px'}} >
                        <div className="col-xl-5 d-flex grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-wrap justify-content-between">
                                        <h4 className="card-title mb-3">Sessions by Channel</h4>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div
                                                        id="circleProgress6"
                                                        className="progressbar-js-circle rounded p-3"
                                                    >
                                                        <svg
                                                            viewBox="0 0 100 100"
                                                            style={{ display: "block", width: "100%" }}
                                                        >
                                                            <path
                                                                d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
                                                                stroke="#eee"
                                                                strokeWidth={10}
                                                                fillOpacity={0}
                                                            />
                                                            <path
                                                                d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
                                                                stroke="rgb(46,32,199)"
                                                                strokeWidth={10}
                                                                fillOpacity={0}
                                                                style={{
                                                                    strokeDasharray: "282.783, 282.783",
                                                                    strokeDashoffset: "70.6958"
                                                                }}
                                                            />
                                                        </svg>
                                                        <div
                                                            className="progressbar-text"
                                                            style={{
                                                                position: "absolute",
                                                                left: "50%",
                                                                top: "50%",
                                                                padding: 0,
                                                                margin: 0,
                                                                transform: "translate(-50%, -50%)",
                                                                color: "rgb(0, 23, 55)",
                                                                fontSize: "1.875rem",
                                                                fontWeight: 700
                                                            }}
                                                        >
                                                            <p className="text-center mb-0">Score</p>75%
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <ul className="session-by-channel-legend">
                                                        <li>
                                                            <div>Firewalls(3)</div>
                                                            <div>4(100%)</div>
                                                        </li>
                                                        <li>
                                                            <div>Ports(12)</div>
                                                            <div>12(100%)</div>
                                                        </li>
                                                        <li>
                                                            <div>Servers(233)</div>
                                                            <div>2(100%)</div>
                                                        </li>
                                                        <li>
                                                            <div>Firewalls(3)</div>
                                                            <div>7(100%)</div>
                                                        </li>
                                                        <li>
                                                            <div>Firewalls(3)</div>
                                                            <div>6(70%)</div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 d-flex grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-wrap justify-content-between">
                                        <h4 className="card-title mb-3">Events</h4>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="chartjs-size-monitor">
                                                        <div className="chartjs-size-monitor-expand">
                                                            <div className="" />
                                                        </div>
                                                        <div className="chartjs-size-monitor-shrink">
                                                            <div className="" />
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-between mb-md-5 mt-3">
                                                        <div className="small">Critical</div>
                                                        <div className="text-danger small">Error</div>
                                                        <div className="text-warning small">Warning</div>
                                                    </div>
                                                    <canvas
                                                        id="eventChart"
                                                        style={{ display: "block", height: 420, width: 840 }}
                                                        width={1050}
                                                        height={525}
                                                        className="chartjs-render-monitor"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 d-flex grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-wrap justify-content-between">
                                        <h4 className="card-title mb-3">Device stats</h4>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="d-flex justify-content-between mb-4">
                                                        <div>Uptime</div>
                                                        <div className="text-muted">195 Days, 8 hours</div>
                                                    </div>
                                                    <div className="d-flex justify-content-between mb-4">
                                                        <div>First Seen</div>
                                                        <div className="text-muted">23 Sep 2019, 2.04PM</div>
                                                    </div>
                                                    <div className="d-flex justify-content-between mb-4">
                                                        <div>Collected time</div>
                                                        <div className="text-muted">23 Sep 2019, 2.04PM</div>
                                                    </div>
                                                    <div className="d-flex justify-content-between mb-4">
                                                        <div>Memory space</div>
                                                        <div className="text-muted">168.3GB</div>
                                                    </div>
                                                    <div className="progress progress-md mt-4">
                                                        <div
                                                            className="progress-bar bg-success"
                                                            role="progressbar"
                                                            style={{ width: "50%" }}
                                                            aria-valuenow={50}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{marginLeft:'120px',marginTop:'20px'}}>
                        <div className="col-xl-3 d-flex grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-wrap justify-content-between">
                                        <h4 className="card-title mb-3">Sessions by Channel</h4>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="d-flex justify-content-between mb-4">
                                                        <div className="font-weight-medium">Empolyee Name</div>
                                                        <div className="font-weight-medium">This Month</div>
                                                    </div>
                                                    <div className="d-flex justify-content-between mb-4">
                                                        <div className="text-secondary font-weight-medium">
                                                            Connor Chandler
                                                        </div>
                                                        <div className="small">$ 4909</div>
                                                    </div>
                                                    <div className="d-flex justify-content-between mb-4">
                                                        <div className="text-secondary font-weight-medium">
                                                            Russell Floyd
                                                        </div>
                                                        <div className="small">$857</div>
                                                    </div>
                                                    <div className="d-flex justify-content-between mb-4">
                                                        <div className="text-secondary font-weight-medium">
                                                            Douglas White
                                                        </div>
                                                        <div className="small">$612 </div>
                                                    </div>
                                                    <div className="d-flex justify-content-between mb-4">
                                                        <div className="text-secondary font-weight-medium">
                                                            Alta Fletcher{" "}
                                                        </div>
                                                        <div className="small">$233</div>
                                                    </div>
                                                    <div className="d-flex justify-content-between mb-4">
                                                        <div className="text-secondary font-weight-medium">
                                                            Marguerite Pearson
                                                        </div>
                                                        <div className="small">$233</div>
                                                    </div>
                                                    <div className="d-flex justify-content-between mb-4">
                                                        <div className="text-secondary font-weight-medium">
                                                            Leonard Gutierrez
                                                        </div>
                                                        <div className="small">$35</div>
                                                    </div>
                                                    <div className="d-flex justify-content-between mb-4">
                                                        <div className="text-secondary font-weight-medium">
                                                            Helen Benson
                                                        </div>
                                                        <div className="small">$43</div>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="text-secondary font-weight-medium">
                                                            Helen Benson
                                                        </div>
                                                        <div className="small">$43</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 d-flex grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-wrap justify-content-between">
                                        <h4 className="card-title mb-3">Sales Analytics</h4>
                                        <button type="button" className="btn btn-sm btn-light">
                                            Month
                                        </button>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="chartjs-size-monitor">
                                                <div className="chartjs-size-monitor-expand">
                                                    <div className="" />
                                                </div>
                                                <div className="chartjs-size-monitor-shrink">
                                                    <div className="" />
                                                </div>
                                            </div>
                                            <div className="d-md-flex mb-4">
                                                <div className="mr-md-5 mb-4">
                                                    <h5 className="mb-1">
                                                        <i className="typcn typcn-globe-outline mr-1" />
                                                        Online
                                                    </h5>
                                                    <h2 className="text-primary mb-1 font-weight-bold">
                                                        23,342
                                                    </h2>
                                                </div>
                                                <div className="mr-md-5 mb-4">
                                                    <h5 className="mb-1">
                                                        <i className="typcn typcn-archive mr-1" />
                                                        Offline
                                                    </h5>
                                                    <h2 className="text-secondary mb-1 font-weight-bold">
                                                        13,221
                                                    </h2>
                                                </div>
                                                <div className="mr-md-5 mb-4">
                                                    <h5 className="mb-1">
                                                        <i className="typcn typcn-tags mr-1" />
                                                        Marketing
                                                    </h5>
                                                    <h2 className="text-warning mb-1 font-weight-bold">
                                                        1,542
                                                    </h2>
                                                </div>
                                            </div>
                                            <canvas
                                                id="salesanalyticChart"
                                                width={1050}
                                                height={525}
                                                style={{ display: "block", height: 420, width: 840 }}
                                                className="chartjs-render-monitor"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 d-flex grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-wrap justify-content-between">
                                        <h4 className="card-title mb-3">Card Title</h4>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="chartjs-size-monitor">
                                                <div className="chartjs-size-monitor-expand">
                                                    <div className="" />
                                                </div>
                                                <div className="chartjs-size-monitor-shrink">
                                                    <div className="" />
                                                </div>
                                            </div>
                                            <div className="mb-5">
                                                <div className="mr-1">
                                                    <div className="text-info mb-1">Total Earning</div>
                                                    <h2 className="mb-2 mt-2 font-weight-bold">287,493$</h2>
                                                    <div className="font-weight-bold">
                                                        1.4% Since Last Month
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="mr-1">
                                                    <div className="text-info mb-1">Total Earning</div>
                                                    <h2 className="mb-2 mt-2  font-weight-bold">87,493</h2>
                                                    <div className="font-weight-bold">
                                                        5.43% Since Last Month
                                                    </div>
                                                </div>
                                            </div>
                                            <canvas
                                                id="barChartStacked"
                                                width={1050}
                                                height={525}
                                                style={{ display: "block", height: 420, width: 840 }}
                                                className="chartjs-render-monitor"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{marginLeft:'120px',marginTop:'20px'}}>
                        <div className="col-lg-12 d-flex grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-wrap justify-content-between">
                                        <h4 className="card-title mb-3">E-Commerce Analytics</h4>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-9">
                                            <div className="d-sm-flex justify-content-between">
                                                <div className="dropdown">
                                                    <button
                                                        className="btn bg-white btn-sm dropdown-toggle btn-icon-text pl-0"
                                                        type="button"
                                                        id="dropdownMenuSizeButton4"
                                                        data-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                    >
                                                        Mon,1 Oct 2019 - Tue,2 Oct 2019
                                                    </button>
                                                    <div
                                                        className="dropdown-menu"
                                                        aria-labelledby="dropdownMenuSizeButton4"
                                                        data-x-placement="top-start"
                                                    >
                                                        <h6 className="dropdown-header">
                                                            Mon,17 Oct 2019 - Tue,25 Oct 2019
                                                        </h6>
                                                        <a className="dropdown-item" href="#">
                                                            Tue,18 Oct 2019 - Wed,26 Oct 2019
                                                        </a>
                                                        <a className="dropdown-item" href="#">
                                                            Wed,19 Oct 2019 - Thu,26 Oct 2019
                                                        </a>
                                                    </div>
                                                </div>
                                                <div>
                                                    <button type="button" className="btn btn-sm btn-light mr-2">
                                                        Day
                                                    </button>
                                                    <button type="button" className="btn btn-sm btn-light mr-2">
                                                        Week
                                                    </button>
                                                    <button type="button" className="btn btn-sm btn-light">
                                                        Month
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="chart-container mt-4">
                                                <div className="chartjs-size-monitor">
                                                    <div className="chartjs-size-monitor-expand">
                                                        <div className="" />
                                                    </div>
                                                    <div className="chartjs-size-monitor-shrink">
                                                        <div className="" />
                                                    </div>
                                                </div>
                                                <canvas
                                                    id="ecommerceAnalytic"
                                                    width={1050}
                                                    height={525}
                                                    style={{ display: "block", height: 420, width: 840 }}
                                                    className="chartjs-render-monitor"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div>
                                                <div className="d-flex justify-content-between mb-3">
                                                    <div className="text-success font-weight-bold">Inbound</div>
                                                </div>
                                                <div className="d-flex justify-content-between mb-3">
                                                    <div className="font-weight-medium">Current</div>
                                                    <div className="text-muted">38.34M</div>
                                                </div>
                                                <div className="d-flex justify-content-between mb-3">
                                                    <div className="font-weight-medium">Average</div>
                                                    <div className="text-muted">38.34M</div>
                                                </div>
                                                <div className="d-flex justify-content-between mb-3">
                                                    <div className="font-weight-medium">Maximum</div>
                                                    <div className="text-muted">68.14M</div>
                                                </div>
                                                <div className="d-flex justify-content-between mb-3">
                                                    <div className="font-weight-medium">60th %</div>
                                                    <div className="text-muted">168.3GB</div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="mt-4">
                                                <div className="d-flex justify-content-between mb-3">
                                                    <div className="text-success font-weight-bold">
                                                        Outbound
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-between mb-3">
                                                    <div className="font-weight-medium">Current</div>
                                                    <div className="text-muted">458.77M</div>
                                                </div>
                                                <div className="d-flex justify-content-between mb-3">
                                                    <div className="font-weight-medium">Average</div>
                                                    <div className="text-muted">1.45K</div>
                                                </div>
                                                <div className="d-flex justify-content-between mb-3">
                                                    <div className="font-weight-medium">Maximum</div>
                                                    <div className="text-muted">15.50K</div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <div className="font-weight-medium">60th %</div>
                                                    <div className="text-muted">45.5</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{marginLeft:'120px',marginTop:'20px'}}>
                        <div className="col-lg-4 d-flex grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="chartjs-size-monitor">
                                        <div className="chartjs-size-monitor-expand">
                                            <div className="" />
                                        </div>
                                        <div className="chartjs-size-monitor-shrink">
                                            <div className="" />
                                        </div>
                                    </div>
                                    <div className="d-flex flex-wrap justify-content-between">
                                        <h4 className="card-title mb-3">Sale Analysis Trend</h4>
                                    </div>
                                    <div className="mt-2">
                                        <div className="d-flex justify-content-between">
                                            <small>Order Value</small>
                                            <small>155.5%</small>
                                        </div>
                                        <div className="progress progress-md  mt-2">
                                            <div
                                                className="progress-bar bg-secondary"
                                                role="progressbar"
                                                style={{ width: "80%" }}
                                                aria-valuenow={90}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <div className="d-flex justify-content-between">
                                            <small>Total Products</small>
                                            <small>238.2%</small>
                                        </div>
                                        <div className="progress progress-md  mt-2">
                                            <div
                                                className="progress-bar bg-success"
                                                role="progressbar"
                                                style={{ width: "50%" }}
                                                aria-valuenow={90}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4 mb-5">
                                        <div className="d-flex justify-content-between">
                                            <small>Quantity</small>
                                            <small>23.30%</small>
                                        </div>
                                        <div className="progress progress-md mt-2">
                                            <div
                                                className="progress-bar bg-warning"
                                                role="progressbar"
                                                style={{ width: "70%" }}
                                                aria-valuenow={90}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                            />
                                        </div>
                                    </div>
                                    <canvas
                                        id="salesTopChart"
                                        width={1050}
                                        height={525}
                                        style={{ display: "block", height: 420, width: 840 }}
                                        className="chartjs-render-monitor"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 d-flex grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-wrap justify-content-between">
                                        <h4 className="card-title mb-3">Project status</h4>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex">
                                                            <img
                                                                className="img-sm rounded-circle mb-md-0 mr-2"
                                                                src="images/faces/face30.png"
                                                                alt="profile image"
                                                            />
                                                            <div>
                                                                <div> Company</div>
                                                                <div className="font-weight-bold mt-1">
                                                                    volkswagen
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        Budget
                                                        <div className="font-weight-bold  mt-1">$2322 </div>
                                                    </td>
                                                    <td>
                                                        Status
                                                        <div className="font-weight-bold text-success  mt-1">
                                                            88%{" "}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        Deadline
                                                        <div className="font-weight-bold  mt-1">07 Nov 2019</div>
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-secondary"
                                                        >
                                                            edit actions
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex">
                                                            <img
                                                                className="img-sm rounded-circle mb-md-0 mr-2"
                                                                src="images/faces/face31.png"
                                                                alt="profile image"
                                                            />
                                                            <div>
                                                                <div> Company</div>
                                                                <div className="font-weight-bold  mt-1">
                                                                    Land Rover
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        Budget
                                                        <div className="font-weight-bold  mt-1">$12022</div>
                                                    </td>
                                                    <td>
                                                        Status
                                                        <div className="font-weight-bold text-success  mt-1">
                                                            70%{" "}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        Deadline
                                                        <div className="font-weight-bold  mt-1">08 Nov 2019</div>
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-secondary"
                                                        >
                                                            edit actions
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex">
                                                            <img
                                                                className="img-sm rounded-circle mb-md-0 mr-2"
                                                                src="images/faces/face32.png"
                                                                alt="profile image"
                                                            />
                                                            <div>
                                                                <div> Company</div>
                                                                <div className="font-weight-bold  mt-1">Bentley </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        Budget
                                                        <div className="font-weight-bold  mt-1">$8,725</div>
                                                    </td>
                                                    <td>
                                                        Status
                                                        <div className="font-weight-bold text-success  mt-1">
                                                            87%{" "}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        Deadline
                                                        <div className="font-weight-bold  mt-1">11 Jun 2019</div>
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-secondary"
                                                        >
                                                            edit actions
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex">
                                                            <img
                                                                className="img-sm rounded-circle mb-md-0 mr-2"
                                                                src="images/faces/face33.png"
                                                                alt="profile image"
                                                            />
                                                            <div>
                                                                <div> Company</div>
                                                                <div className="font-weight-bold  mt-1">Morgan </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        Budget
                                                        <div className="font-weight-bold  mt-1">$5,220 </div>
                                                    </td>
                                                    <td>
                                                        Status
                                                        <div className="font-weight-bold text-success  mt-1">
                                                            65%{" "}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        Deadline
                                                        <div className="font-weight-bold  mt-1">26 Oct 2019</div>
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-secondary"
                                                        >
                                                            edit actions
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex">
                                                            <img
                                                                className="img-sm rounded-circle mb-md-0 mr-2"
                                                                src="images/faces/face34.png"
                                                                alt="profile image"
                                                            />
                                                            <div>
                                                                <div> Company</div>
                                                                <div className="font-weight-bold  mt-1">
                                                                    volkswagen
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        Budget
                                                        <div className="font-weight-bold  mt-1">$2322 </div>
                                                    </td>
                                                    <td>
                                                        Status
                                                        <div className="font-weight-bold text-success mt-1">
                                                            88%{" "}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        Deadline
                                                        <div className="font-weight-bold  mt-1">07 Nov 2019</div>
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-secondary"
                                                        >
                                                            edit actions
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default Dashboard;