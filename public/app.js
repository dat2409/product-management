$(document).ready(function() {
    const apiUrl = '/api/products';

    function renderProducts(products) {
        $('#productList').empty();
        if (!products || products.length === 0) {
            $('#productList').append('<li class="list-group-item">Không có sản phẩm nào.</li>');
            return;
        }
        products.forEach(function(product) {
            $('#productList').append(`
                <li class="list-group-item d-flex justify-content-between align-items-center" data-id="${product.id}">
                    <div class="w-75">
                        <strong>${product.name}</strong> - ${formatCurrency(product.price)}
                        <br>
                        <small class="text-muted">${product.description || ''}</small>
                    </div>
                    <div class="action-buttons">
                        <button class="btn btn-sm btn-info edit-btn" data-id="${product.id}">Sửa</button>
                        <button class="btn btn-sm btn-danger delete-btn" data-id="${product.id}">Xóa</button>
                    </div>
                </li>
            `);
        });
    }

    function loadProducts() {
        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function(data) {
                renderProducts(data);
            },
            error: function(err) {
                console.error('Lỗi tải sản phẩm:', err);
                $('#productList').html('<li class="list-group-item text-danger">Lỗi tải danh sách sản phẩm. Vui lòng thử lại.</li>');
            }
        });
    }

    function formatCurrency(number) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
    }

    function showModal(title = 'Thêm Sản Phẩm', product = null) {
        $('#modalTitle').text(title);
        $('#productForm')[0].reset();
        $('#productId').val('');

        if (product) {
            $('#productId').val(product.id);
            $('#productName').val(product.name);
            $('#productDescription').val(product.description);
            $('#productPrice').val(parseFloat(product.price));
        }

        $('#productModal').addClass('show');
        $('#modalBackdrop').addClass('show');
    }

    function hideModal() {
        $('#productModal').removeClass('show');
        $('#modalBackdrop').removeClass('show');
    }

    $('#addProductBtn').on('click', function() {
        showModal('Thêm Sản Phẩm Mới');
    });

    $('#closeModalBtnTop, #cancelModalBtn').on('click', function() {
        hideModal();
    });

    $('#saveProductBtn').on('click', function() {
        const productName = $('#productName').val();
        const productPrice = $('#productPrice').val();

        if (!productName.trim() || !productPrice) {
            alert('Tên sản phẩm và Giá là bắt buộc!');
            return;
        }
        if (isNaN(parseFloat(productPrice)) || parseFloat(productPrice) < 0) {
            alert('Giá phải là một số không âm.');
            return;
        }

        const productData = {
            name: productName,
            description: $('#productDescription').val(),
            price: parseFloat(productPrice)
        };
        const productId = $('#productId').val();

        let method = 'POST';
        let url = apiUrl;

        if (productId) {
            method = 'PUT';
            url = `${apiUrl}/${productId}`;
        }

        $.ajax({
            url: url,
            method: method,
            contentType: 'application/json',
            data: JSON.stringify(productData),
            success: function(response) {
                hideModal();
                loadProducts();
                alert(productId ? 'Cập nhật sản phẩm thành công!' : 'Thêm sản phẩm thành công!');
            },
            error: function(err) {
                console.error('Lỗi lưu sản phẩm:', err);
                let errorMsg = 'Lỗi lưu sản phẩm.';
                if (err.responseJSON && err.responseJSON.message) {
                     errorMsg = err.responseJSON.message;
                }
                if (err.responseJSON && err.responseJSON.errors) {
                    errorMsg += '\nChi tiết:\n';
                    for (const key in err.responseJSON.errors) {
                        errorMsg += `- ${err.responseJSON.errors[key].join(', ')}\n`;
                    }
                }
                alert(errorMsg);
            }
        });
    });

    $('#productList').on('click', '.edit-btn', function() {
        const productId = $(this).data('id');
        $.ajax({
            url: `${apiUrl}/${productId}`,
            method: 'GET',
            success: function(product) {
                showModal('Sửa Sản Phẩm', product);
            },
            error: function(err) {
                console.error('Lỗi lấy thông tin sản phẩm để sửa:', err);
                alert('Không thể lấy thông tin sản phẩm. Vui lòng thử lại.');
            }
        });
    });

    $('#productList').on('click', '.delete-btn', function() {
        const productId = $(this).data('id');
        if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            $.ajax({
                url: `${apiUrl}/${productId}`,
                method: 'DELETE',
                success: function() {
                    loadProducts();
                    alert('Xóa sản phẩm thành công!');
                },
                error: function(err) {
                    console.error('Lỗi xóa sản phẩm:', err);
                    alert('Không thể xóa sản phẩm. Vui lòng thử lại.');
                }
            });
        }
    });

    loadProducts();
});
