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
                                    <button type="button" class="btn btn-success  m-2" data-bs-toggle="modal" data-bs-target="#expenseModal">
                                        Add New Transaction
                                    </button>
                                </div>
                                <h5 class="card-header">Expenses Table</h5>
                                <div class="table-responsive text-nowrap" id="expenseTable">
                                    <table class="table">
                                        <thead class="table-light">


                                            <tr>
                                                <th>#</th>
                                                <th>Amount</th>
                                                <th>Type</th>
                                                <th>Description</th>
                                                <th>user_name</th>
                                                <th>Account_name</th>
                                                <th>Date</th>
                                                <!-- <th>Action</th> -->
                                            </tr>
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



                <div class="modal fade" id="expenseModal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modalCenterTitle">Expenses Modal</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">

                                <form id="expenseForm">
                                    <input type="hidden" name="update_id" id="update_id">

                                    <div class="row">
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="">Amount</label>
                                                <input type="text" name="amount" id="amount" class="form-control">
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="">Type</label>
                                                <select name="type" id="type" class="form-control">
                                                    <option value="Income">
                                                        Income
                                                    </option>
                                                    <option value="Expense">
                                                        Expense
                                                    </option>
                                                </select>

                                            </div>
                                        </div>

                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="">Description</label>
                                                <input type="text" name="description" id="description" class="form-control">
                                            </div>
                                        </div>


                                        <div class="col-sm-6 mt-3">
                                            <div class="form-group">
                                                <label for="">user_name</label>
                                                <select name="user_id" id="user_id" class="form-control">

                                                </select>

                                            </div>
                                        </div>

                                        <div class="col-sm-6 mt-3">
                                            <div class="form-group">
                                                <label for="">Account_name</label>
                                                <select name="Account_id" id="Account_id" class="form-control">

                                                </select>

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