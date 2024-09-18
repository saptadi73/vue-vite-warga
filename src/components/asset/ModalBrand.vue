<template>
  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn btn-primary"
    data-toggle="modal"
    data-target="#penambahanbrand"
  >
    Add
  </button>

  <!-- Modal -->
  <div
    class="modal fade"
    id="penambahanbrand"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Penambahan Brand</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <div class="form-group">
                <label for="nama_brand">Nama</label>
                <input
                  type="text"
                  class="form-control"
                  id="nama"
                  placeholder="Nama Asset"
                />
              </div>

              <div class="form-group">
                <label for="keterangan_brand">Keterangan</label>
                <input
                  type="text"
                  class="form-control"
                  id="keterangan"
                  placeholder="type perangkat"
                />
              </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>
