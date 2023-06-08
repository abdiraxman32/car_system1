<?php

require 'include/header.php';

?>

<!-- Layout wrapper -->
<div class="layout-wrapper layout-content-navbar">
  <div class="layout-container">
    <!-- sidebar -->
    <?php
    require 'include/sidebar.php';

    ?>
    <!-- / sidebar -->

    <!-- Layout container -->
    <div class="layout-page">
      <!-- Navbar -->
      <?php
      require 'include/nav.php';
      ?>
      <!-- / Navbar -->

      <!-- Content wrapper -->
      <div class="content-wrapper">
        <!-- Content -->
        <?php
        require 'include/contents.php';
        ?>
        <!-- / Content -->



        <!-- Footer -->

        <?php

        require 'include/footer.php';
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
require 'include/script.php';
?>