<?php 
session_start();
if(!isset($_SESSION['username'])){
    header('Location:login.php');
    die();
}

?>
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

                <div class="container mt-4">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="text-end">
                                    <button type="button" class="btn btn-success  m-2" data-bs-toggle="modal" data-bs-target="#sellingmodal">
                                        Add selling
                                    </button>
                                </div>
                                <h5 class="card-header">Selling Table</h5>
                                <div class="table-responsive text-nowrap" id="sellingTable">
                                    <table class="table">
                                        <thead class="table-light">

                                        </thead>

                                        <tbody>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / Content -->



                <div class="modal fade" id="sellingmodal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modalCenterTitle">Selling Modal</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">

                                <form id="sellingForm">
                                    <input type="hidden" name="update_id" id="update_id">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label for="">customer_name</label>
                                                <select name="customer_id" id="customer_id" class="form-control">

                                                </select>
                                            </div>

                                        </div>


                                        <div class="col-sm-12 mt-3">
                                            <div class="form-group">
                                                <label for="">car_name</label>
                                                <select name="car_id" id="car_id" class="form-control car_name">

                                                </select>
                                            </div>

                                        </div>

                                        <div class="col-sm-12 mt-3">
                                            <div class="form-group">
                                                <label for="">price</label>
                                                <input type="text" name="price" id="price" class="form-control" readonly>
                                            </div>

                                        </div>

                                        <div class="col-sm-12 mt-3">
                                            <div class="form-group">
                                                <label for="">quantity</label>
                                                <input type="number" name="quantity" id="quantity" class="form-control">
                                            </div>

                                        </div>


                                        <div class="col-sm-12 mt-3">
                                            <div class="form-group">
                                                <label for="">balance</label>
                                                <input type="text" name="balance" id="balance" class="form-control" readonly>
                                            </div>

                                        </div>








                                    </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                    Close
                                </button>
                                <button type="submit" class="btn btn-primary">Save changes</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>



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