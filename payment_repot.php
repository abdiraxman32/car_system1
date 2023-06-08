<?php

include 'include/header.php';

?>
<!-- Layout wrapper -->
<div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">
        <!-- sidebar -->
        <?php
        include 'include/sidebar.php';

        ?>
        <!-- / sidebar -->

        <!-- Layout container -->
        <div class="layout-page">
            <!-- Navbar -->
            <?php
            include 'include/nav.php';
            ?>
            <!-- / Navbar -->

            <!-- Content wrapper -->
            <div class="content-wrapper">
                <!-- Content -->


                <div class="cl-xl-12">
                    <div class="card">
                        <div class="card-header">
                            <h5>payment Table</h5>
                            <span class="d-block m-t-5"> <code></code> </span>
                            <form id="Paymentform">

                                <div class="row">
                                    <div class="col-sm-4">
                                        <select name="type" id="type" class="form-control">
                                            <option value="0">All</option>
                                            <option value="custom">custom</option>
                                        </select>
                                    </div>

                                    <div class="col-sm-5">
                                        <input type="text" name="tellphone" id="tellphone" class="form-control">
                                    </div>



                                    <div class="col-sm-4">
                                        <button type="submit" id="Adddnew" class="btn btn-info m-3">Add new transaction</button>
                                    </div>
                                </div>
                            </form>

                            <div class="row">
                                <div class="table-responsive" id="printt_Area">
                                    <img width="100%" ; height="330px" src="su.jpg" class="mb-3">

                                    <table class="table" id="Paymentable">
                                        <thead>

                                        </thead>
                                        <tbody>


                                        </tbody>

                                    </table>

                                </div>
                                <div class="col-sm-4">
                                    <button id="printt_statement" class="btn btn-success ml-1"><i class="fa fa-print"></i>print</button>
                                    <button id="exportt_statement" class="btn btn-info mr-4"><i class="fa fa-file"></i>Export</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <!-- / Content -->







                <!-- Footer -->

                <?php

                include 'include/footer.php';
                ?>
                <!-- / Footer -->

                <div class="content-backdrop fade"></div>
            </div>
            <!-- Content wrapper -->
        </div>
        <!-- / Layout page -->
    </div>

    <!-- Overlay -->
    <div class="layout-overlay layout-menu-toggle"></div>
</div>
<!-- / Layout wrapper -->

<?php
include 'include/script.php';
?>