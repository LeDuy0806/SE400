package gin_item_handler

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
	"todo-list/common"
	"todo-list/modules/item/biz"
	"todo-list/modules/item/model"
	"todo-list/modules/item/storage"
)

func ListItems(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		var paging common.Paging

		if err := c.ShouldBindQuery(&paging); err != nil {
			c.JSON(http.StatusBadRequest, common.ErrInvalidRequest(err))
			return
		}

		paging.Process()

		var filter model.Filter

		if err := c.ShouldBindQuery(&filter); err != nil {
			c.JSON(http.StatusBadRequest, common.ErrInvalidRequest(err))
			return
		}

		store := storage.NewSQLStorage(db)
		business := biz.NewListItemBiz(store)

		items, err := business.ListItem(c, &filter, &paging)

		if err != nil {
			c.JSON(http.StatusInternalServerError, err)
			return
		}

		c.JSON(http.StatusOK, common.NewSuccessResponse(items, paging, filter))
	}
}
