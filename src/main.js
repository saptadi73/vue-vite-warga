import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


// Import Bootstrap, jQuery, dan AdminLTE
import './admin-lte/plugins/jquery/jquery.min.js';
import './admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js';
import './admin-lte/dist/js/adminlte.min.js'

// Import CSS AdminLTE dan Bootstrap
import './admin-lte/plugins/fontawesome-free/css/all.min.css';
import './admin-lte/dist/css/adminlte.min.css';
import './admin-lte/plugins/bootstrap/js/bootstrap.bundle.min'

import "./admin-lte/plugins/bs-custom-file-input/bs-custom-file-input.min"

//DataTables  & Plugins
import './admin-lte/plugins/datatables/jquery.dataTables.min'
import './admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min'
import './admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min'
import './admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min'
import './admin-lte/plugins/datatables-buttons/js/dataTables.buttons.min'

$(function () {
    $("#tableoke").DataTable({
      "responsive": true, "lengthChange": false, "autoWidth": false,
      "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    }).buttons().container().appendTo('#tableoke_wrapper .col-md-6:eq(0)');
    $('#example2').DataTable({
      "paging": true,
      "lengthChange": false,
      "searching": false,
      "ordering": true,
      "info": true,
      "autoWidth": false,
      "responsive": true,
    });
  });



const app = createApp(App)

app.use(router)

app.mount('#app')
