package gin_item_handler

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
	"strconv"
	"todo-list/common"
	"todo-list/modules/item/biz"
	"todo-list/modules/item/storage"
)

func DeleteItem(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			c.JSON(http.StatusBadRequest, common.ErrInvalidRequest(err))
			return
		}

		store := storage.NewSQLStorage(db)
		business := biz.NewDeleteItemBiz(store)

		if err := business.DeleteItem(c.Request.Context(), id); err != nil {
			c.JSON(http.StatusBadRequest, err)
			return
		}

		c.JSON(http.StatusOK, common.NewSuccessResponseData(true))
	}
}