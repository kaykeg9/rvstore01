"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  ShoppingBag,
  Phone,
  Instagram,
  MapPin,
  Star,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  ArrowRight,
  Zap,
  Shield,
  Truck,
  TrendingUp,
  Heart,
  Search,
  ShoppingCart,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

// Produtos iniciais com mais dados para design premium
const initialProducts = [
  {
    id: 1,
    name: "Camisa Longline Premium",
    category: "Camisas Longline",
    price: 89.9,
    originalPrice: 120.0,
    image: "/stylish-black-longline-shirt.png",
    description: "Camisa longline de alta qualidade, perfeita para um look moderno e despojado.",
    isActive: true,
    isPromotion: true,
    stock: 15,
    rating: 4.8,
    reviews: 124,
    isNew: false,
    isBestSeller: true,
    createdAt: new Date().toISOString(),
    sizes: ["P", "M", "G"],
  },
  {
    id: 2,
    name: "Camisa Oversized Street",
    category: "Camisas Oversized",
    price: 79.9,
    originalPrice: 79.9,
    image: "/white-oversized-shirt-streetwear.png",
    description: "Camisa oversized com corte urbano, ideal para quem busca conforto e estilo.",
    isActive: true,
    isPromotion: false,
    stock: 8,
    rating: 4.6,
    reviews: 89,
    isNew: true,
    isBestSeller: false,
    createdAt: new Date().toISOString(),
    sizes: ["P", "M", "G"],
  },
  {
    id: 3,
    name: "Kit Flamengo 2024",
    category: "Kits de Time",
    price: 149.9,
    originalPrice: 180.0,
    image: "/red-black-soccer-jersey.png",
    description: "Kit completo do Flamengo, camisa e shorts de alta qualidade.",
    isActive: true,
    isPromotion: true,
    stock: 5,
    rating: 4.9,
    reviews: 203,
    isNew: false,
    isBestSeller: true,
    createdAt: new Date().toISOString(),
    sizes: ["P", "M", "G"],
  },
  {
    id: 4,
    name: "Kit Dri-Fit Performance",
    category: "Kits Dri-Fit",
    price: 119.9,
    originalPrice: 119.9,
    image: "/placeholder-zv9ji.png",
    description: "Conjunto esportivo dri-fit para máximo desempenho e conforto.",
    isActive: true,
    isPromotion: false,
    stock: 12,
    rating: 4.7,
    reviews: 156,
    isNew: false,
    isBestSeller: false,
    createdAt: new Date().toISOString(),
    sizes: ["P", "M", "G"],
  },
  {
    id: 5,
    name: "Boné Snapback Premium",
    category: "Chapéus",
    price: 59.9,
    originalPrice: 79.9,
    image: "/premium-black-snapback.png",
    description: "Boné snapback de alta qualidade com design moderno e elegante.",
    isActive: true,
    isPromotion: true,
    stock: 20,
    rating: 4.5,
    reviews: 78,
    isNew: true,
    isBestSeller: false,
    createdAt: new Date().toISOString(),
    sizes: ["P", "M", "G"],
  },
  {
    id: 6,
    name: "Relógio Digital Sport",
    category: "Relógios",
    price: 199.9,
    originalPrice: 199.9,
    image: "/modern-black-digital-sports-watch.png",
    description: "Relógio digital esportivo com design moderno e funcionalidades avançadas.",
    isActive: true,
    isPromotion: false,
    stock: 3,
    rating: 4.8,
    reviews: 92,
    isNew: false,
    isBestSeller: true,
    createdAt: new Date().toISOString(),
    sizes: ["P", "M", "G"],
  },
  {
    id: 7,
    name: "Tênis Casual Premium",
    category: "Sapatos",
    price: 299.9,
    originalPrice: 299.9,
    image: "/placeholder-wpc0w.png",
    description: "Tênis casual premium com design moderno e máximo conforto.",
    isActive: true,
    isPromotion: false,
    stock: 7,
    rating: 4.9,
    reviews: 167,
    isNew: false,
    isBestSeller: true,
    createdAt: new Date().toISOString(),
    sizes: ["P", "M", "G"],
  },
  {
    id: 8,
    name: "Camisa Longline Estampada",
    category: "Camisas Longline",
    price: 94.9,
    originalPrice: 130.0,
    image: "/printed-longline-shirt-urban.png",
    description: "Camisa longline com estampa exclusiva, perfeita para se destacar.",
    isActive: true,
    isPromotion: true,
    stock: 10,
    rating: 4.6,
    reviews: 134,
    isNew: true,
    isBestSeller: false,
    createdAt: new Date().toISOString(),
    sizes: ["P", "M", "G"],
  },
]

const categories = [
  "Camisas Longline",
  "Camisas Oversized",
  "Kits de Time",
  "Kits Dri-Fit",
  "Chapéus",
  "Relógios",
  "Sapatos",
]

export default function RVStore() {
  const [currentSection, setCurrentSection] = useState("inicio")
  const [products, setProducts] = useState(initialProducts)
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [showProductForm, setShowProductForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const [orderForm, setOrderForm] = useState({
    name: "",
    whatsapp: "",
    address: "",
    product: "",
    size: "",
  })

  const [productForm, setProductForm] = useState({
    id: null,
    name: "",
    category: "",
    price: "",
    originalPrice: "",
    image: "",
    description: "",
    isActive: true,
    isPromotion: false,
    stock: "",
    rating: "4.5",
    reviews: "0",
    isNew: false,
    isBestSeller: false,
  })

  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [cartTotal, setCartTotal] = useState(0)

  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showProductModal, setShowProductModal] = useState(false)

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setShowProductModal(true)
  }

  // Simulação de loading inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Carregar produtos do localStorage ao inicializar
  useEffect(() => {
    const savedProducts = localStorage.getItem("rvstore-products")
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    }
  }, [])

  // Salvar produtos no localStorage sempre que houver mudança
  useEffect(() => {
    localStorage.setItem("rvstore-products", JSON.stringify(products))
  }, [products])

  const handleAdminLogin = (e) => {
    e.preventDefault()
    if (adminPassword === "R7V19KS84.01") {
      setIsAdmin(true)
      setShowAdminLogin(false)
      setAdminPassword("")
    } else {
      alert("Senha incorreta!")
    }
  }

  const handleLogout = () => {
    setIsAdmin(false)
    setCurrentSection("inicio")
  }

  const resetProductForm = () => {
    setProductForm({
      name: "",
      category: "",
      price: "",
      originalPrice: "",
      stock: "",
      rating: "",
      image: "",
      reviews: "",
      description: "",
      isActive: true,
      isPromotion: false,
      isNew: false,
      isBestSeller: false,
    })
    setImageFile(null)
    setImagePreview("")
  }

  const handleImageFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      // Criar preview da imagem
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async (file) => {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Falha no upload da imagem")
    }

    const data = await response.json()
    return data.url
  }

  const handleSaveProduct = async (e) => {
    e.preventDefault()
    setIsUploading(true)

    try {
      let imageUrl = productForm.image

      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      }

      const productData = {
        ...productForm,
        image: imageUrl,
        price: Number.parseFloat(productForm.price),
        originalPrice: Number.parseFloat(productForm.originalPrice),
        stock: Number.parseInt(productForm.stock),
        rating: Number.parseFloat(productForm.rating) || 0,
        reviews: Number.parseInt(productForm.reviews) || 0,
      }

      if (editingProduct) {
        setProducts(products.map((p) => (p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p)))
      } else {
        const newProduct = {
          ...productData,
          id: Date.now(),
        }
        setProducts([...products, newProduct])
      }

      setShowProductForm(false)
      resetProductForm()
    } catch (error) {
      console.error("Erro ao salvar produto:", error)
      alert("Erro ao salvar produto. Tente novamente.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    resetProductForm()
    setShowProductForm(true)
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setProductForm({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      originalPrice: product.originalPrice.toString(),
      stock: product.stock.toString(),
      rating: product.rating.toString(),
      image: product.image,
      reviews: product.reviews.toString(),
      description: product.description,
      isActive: product.isActive,
      isPromotion: product.isPromotion,
      isNew: product.isNew,
      isBestSeller: product.isBestSeller,
    })
    setImagePreview(product.image)
    setImageFile(null)
    setShowProductForm(true)
  }

  const handleDeleteProduct = (productId) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      setProducts(products.filter((p) => p.id !== productId))
    }
  }

  const toggleProductStatus = (productId) => {
    setProducts(products.map((p) => (p.id === productId ? { ...p, isActive: !p.isActive } : p)))
  }

  const handleOrderSubmit = (e) => {
    e.preventDefault()
    const message = `🛍️ *NOVO PEDIDO - RV STORE*

👤 *Cliente:* ${orderForm.name}
📱 *WhatsApp:* ${orderForm.whatsapp}
📍 *Endereço:* ${orderForm.address}
👕 *Produto:* ${orderForm.product}
📏 *Tamanho:* ${orderForm.size}

💰 *Valor:* R$ ${selectedProduct?.price?.toFixed(2)}

Obrigado pela preferência! 🙏`

    const whatsappUrl = `https://wa.me/5581996630750?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  // Funções do Carrinho
  const addToCart = (product, size) => {
    const cartItem = {
      id: Date.now(),
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      size: size,
      quantity: 1,
      isPromotion: product.isPromotion,
    }

    setCart((prevCart) => [...prevCart, cartItem])

    // Mostrar feedback visual
    const button = document.querySelector(`[data-product-id="${product.id}"]`)
    if (button) {
      button.textContent = "Adicionado! ✓"
      button.classList.add("bg-green-600")
      setTimeout(() => {
        button.textContent = "Adicionar ao Carrinho"
        button.classList.remove("bg-green-600")
      }, 2000)
    }
  }

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
  }

  const updateCartQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId)
      return
    }

    setCart((prevCart) => prevCart.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
  }

  const clearCart = () => {
    setCart([])
  }

  // Calcular total do carrinho
  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setCartTotal(total)
  }, [cart])

  const handleCartCheckout = (customerInfo) => {
    if (cart.length === 0) {
      alert("Seu carrinho está vazio!")
      return
    }

    let message = `🛍️ *NOVO PEDIDO - RV STORE*\n\n`
    message += `👤 *Cliente:* ${customerInfo.name}\n`
    message += `📱 *WhatsApp:* ${customerInfo.whatsapp}\n`
    message += `📍 *Endereço:* ${customerInfo.address}\n\n`
    message += `🛒 *ITENS DO PEDIDO:*\n`
    message += `${"=".repeat(30)}\n`

    let totalGeral = 0
    let totalEconomia = 0

    cart.forEach((item, index) => {
      const subtotal = item.price * item.quantity
      const economia = item.isPromotion ? (item.originalPrice - item.price) * item.quantity : 0

      message += `\n${index + 1}. *${item.name}*\n`
      message += `   📏 Tamanho: ${item.size}\n`
      message += `   📦 Quantidade: ${item.quantity}x\n`
      message += `   💰 Preço unitário: R$ ${item.price.toFixed(2)}\n`

      if (item.isPromotion && item.originalPrice > item.price) {
        message += `   🏷️ Preço original: R$ ${item.originalPrice.toFixed(2)}\n`
        message += `   💚 Economia: R$ ${economia.toFixed(2)}\n`
      }

      message += `   💵 Subtotal: R$ ${subtotal.toFixed(2)}\n`

      totalGeral += subtotal
      totalEconomia += economia
    })

    message += `\n${"=".repeat(30)}\n`
    message += `📊 *RESUMO DO PEDIDO:*\n`
    message += `🛍️ Total de itens: ${cart.reduce((sum, item) => sum + item.quantity, 0)}\n`

    if (totalEconomia > 0) {
      message += `💚 Total economizado: R$ ${totalEconomia.toFixed(2)}\n`
    }

    message += `💰 *VALOR TOTAL: R$ ${totalGeral.toFixed(2)}*\n\n`
    message += `✨ Obrigado pela preferência! Em breve entraremos em contato para confirmar seu pedido. 🙏`

    const whatsappUrl = `https://wa.me/5581996630750?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    // Limpar carrinho após envio
    clearCart()
    setShowCart(false)
    alert("Pedido enviado com sucesso! Verifique seu WhatsApp.")
  }

  // Filtrar produtos baseado na pesquisa e categoria
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "Todos" || p.category === selectedCategory

    return p.isActive && matchesSearch && matchesCategory
  })

  // Filtrar apenas produtos ativos para exibição pública
  const activeProducts = filteredProducts
  const bestSellers = activeProducts.filter((p) => p.isBestSeller)
  const newProducts = activeProducts.filter((p) => p.isNew)
  const promotions = activeProducts.filter((p) => p.isPromotion)

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-8"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-spin mx-auto"></div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 animate-pulse">RV STORE</h1>
          <p className="text-gray-300 animate-pulse">Carregando experiência premium...</p>
        </div>
      </div>
    )
  }

  const Navigation = ({ mobile = false }) => (
    <nav className="flex space-x-4 md:space-x-8">
      <button
        onClick={() => setCurrentSection("inicio")}
        className={`font-medium transition-all duration-300 relative group text-sm md:text-base ${
          currentSection === "inicio" ? "text-black" : "text-gray-600 hover:text-black"
        }`}
      >
        Início
        <span
          className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ${
            currentSection === "inicio" ? "w-full" : "group-hover:w-full"
          }`}
        ></span>
      </button>
      <button
        onClick={() => setCurrentSection("produtos")}
        className={`font-medium transition-all duration-300 relative group text-sm md:text-base ${
          currentSection === "produtos" ? "text-black" : "text-gray-600 hover:text-black"
        }`}
      >
        Produtos
        <span
          className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ${
            currentSection === "produtos" ? "w-full" : "group-hover:w-full"
          }`}
        ></span>
      </button>
      <button
        onClick={() => setCurrentSection("sobre")}
        className={`font-medium transition-all duration-300 relative group text-sm md:text-base ${
          currentSection === "sobre" ? "text-black" : "text-gray-600 hover:text-black"
        }`}
      >
        Sobre
        <span
          className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ${
            currentSection === "sobre" ? "w-full" : "group-hover:w-full"
          }`}
        ></span>
      </button>
      <button
        onClick={() => setCurrentSection("contato")}
        className={`font-medium transition-all duration-300 relative group text-sm md:text-base ${
          currentSection === "contato" ? "text-black" : "text-gray-600 hover:text-black"
        }`}
      >
        Contato
        <span
          className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ${
            currentSection === "contato" ? "w-full" : "group-hover:w-full"
          }`}
        ></span>
      </button>
      {isAdmin && (
        <button
          onClick={() => setCurrentSection("admin")}
          className={`font-medium transition-all duration-300 relative group text-sm md:text-base ${
            currentSection === "admin" ? "text-black" : "text-gray-600 hover:text-black"
          }`}
        >
          Admin
          <span
            className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ${
              currentSection === "admin" ? "w-full" : "group-hover:w-full"
            }`}
          ></span>
        </button>
      )}
    </nav>
  )

  const ProductCard = ({ product, isAdminView = false, featured = false, compact = false }) => {
    const [selectedSize, setSelectedSize] = useState("")
    const [showSizeSelector, setShowSizeSelector] = useState(false)

    const handleAddToCart = () => {
      if (!selectedSize) {
        setShowSizeSelector(true)
        return
      }
      addToCart(product, selectedSize)
      setSelectedSize("")
      setShowSizeSelector(false)
    }

    return (
      <Card
        className={`cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-white border border-gray-200 ${
          featured ? "border-blue-300" : ""
        } ${compact ? "h-full" : ""}`}
        onClick={() => !isAdminView && handleProductClick(product)}
      >
        <CardContent className="p-0">
          <div className={`${compact ? "aspect-[4/3]" : "aspect-square"} relative overflow-hidden`}>
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />

            <div className="absolute top-2 left-2 flex flex-col gap-1">
              <div className="bg-gray-800 text-white px-2 py-1 text-xs rounded font-medium">{product.category}</div>
              {product.isPromotion && (
                <div className="bg-red-500 text-white px-2 py-1 text-xs rounded font-bold">OFERTA</div>
              )}
              {product.isNew && <div className="bg-green-500 text-white px-2 py-1 text-xs rounded font-bold">NOVO</div>}
              {product.isBestSeller && (
                <div className="bg-yellow-500 text-white px-2 py-1 text-xs rounded font-bold">⭐ BEST</div>
              )}
            </div>

            {/* Rating */}
            {!isAdminView && (
              <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded flex items-center gap-1 shadow-sm">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{product.rating}</span>
              </div>
            )}

            {/* Admin Controls */}
            {isAdminView && (
              <div className="absolute bottom-2 right-2 flex gap-1">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleEditProduct(product)}
                  className="bg-white hover:bg-gray-100"
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => toggleProductStatus(product.id)}
                  className="bg-white hover:bg-gray-100"
                >
                  {product.isActive ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>

          <div className={`${compact ? "p-3" : "p-4"}`}>
            <h4 className={`font-semibold ${compact ? "text-sm mb-1" : "text-base mb-2"} text-gray-900`}>
              {product.name}
            </h4>
            <p className={`text-gray-600 ${compact ? "text-xs mb-2 line-clamp-1" : "text-sm mb-3 line-clamp-2"}`}>
              {product.description}
            </p>

            {/* Reviews */}
            {!isAdminView && !compact && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">({product.reviews} avaliações)</span>
              </div>
            )}

            {isAdminView && (
              <div className="mb-3 flex gap-2 flex-wrap">
                <Badge variant={product.isActive ? "default" : "secondary"} className="text-xs">
                  {product.isActive ? "Ativo" : "Inativo"}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Estoque: {product.stock}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  ⭐ {product.rating}
                </Badge>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-gray-400 line-through">R$ {product.originalPrice.toFixed(2)}</span>
                )}
                <span className={`font-bold ${compact ? "text-lg" : "text-xl"} text-green-600`}>
                  R$ {product.price.toFixed(2)}
                </span>
              </div>

              {!isAdminView && (
                <div className="flex flex-col gap-2">
                  {showSizeSelector && (
                    <div className="flex gap-1 mb-2">
                      {product.sizes.map((size) => (
                        <Button
                          key={size}
                          size="sm"
                          variant={selectedSize === size ? "default" : "outline"}
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedSize(size)
                          }}
                          className="text-xs px-2 py-1 h-6"
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  )}
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddToCart()
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Adicionar ao Carrinho
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const CartCheckoutForm = ({ onSubmit }) => {
    const [customerInfo, setCustomerInfo] = useState({
      name: "",
      whatsapp: "",
      address: "",
    })

    const handleSubmit = (e) => {
      e.preventDefault()
      onSubmit(customerInfo)
      setCustomerInfo({ name: "", whatsapp: "", address: "" })
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cart-name" className="text-gray-700 font-medium">
              Nome Completo
            </Label>
            <Input
              id="cart-name"
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
              className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <Label htmlFor="cart-whatsapp" className="text-gray-700 font-medium">
              WhatsApp
            </Label>
            <Input
              id="cart-whatsapp"
              value={customerInfo.whatsapp}
              onChange={(e) => setCustomerInfo({ ...customerInfo, whatsapp: e.target.value })}
              placeholder="(81) 99663-0750"
              className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="cart-address" className="text-gray-700 font-medium">
            Endereço Completo
          </Label>
          <Textarea
            id="cart-address"
            value={customerInfo.address}
            onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
            className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
            required
          />
        </div>
        <div className="flex gap-2">
          <Button
            type="submit"
            className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
          >
            <Phone className="h-5 w-5 mr-2" />
            Finalizar Pedido via WhatsApp
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setCart([])}
            className="px-6 py-3 rounded-full font-semibold border-gray-300 hover:bg-gray-50 transition-all duration-300"
          >
            Limpar Carrinho
          </Button>
        </div>
      </form>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 overflow-x-hidden">
      {/* Header Premium */}
      <header className="border-b border-gray-200/50 sticky top-0 bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center">
              <div className="flex items-center">
                <Image
                  src="/rv-store-logo.png"
                  alt="RV Store Logo"
                  width={40}
                  height={40}
                  className="md:w-12 md:h-12 rounded-full"
                />
              </div>
            </div>

            <Navigation />

            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Search Bar - sempre visível, redimensionando proporcionalmente */}
              <div className="relative">
                <Search className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 md:h-4 md:w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 md:pl-10 pr-3 md:pr-4 py-1.5 md:py-2 w-32 md:w-64 text-sm border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-full"
                />
              </div>

              <div className="relative">
                <ShoppingBag
                  className="h-5 w-5 md:h-6 md:w-6 text-gray-700 hover:text-black transition-colors cursor-pointer"
                  onClick={() => setShowCart(true)}
                />
                {cart.length > 0 && (
                  <div className="absolute -top-1.5 md:-top-2 -right-1.5 md:-right-2 w-4 h-4 md:w-5 md:h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-xs text-white font-bold">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>
                )}
              </div>

              {!isAdmin ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAdminLogin(true)}
                  className="flex hover:bg-gray-100 transition-colors p-1.5 md:p-2"
                >
                  <Settings className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="flex text-xs md:text-sm hover:bg-gray-100 transition-colors px-2 md:px-3 py-1 md:py-2"
                >
                  Sair
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Admin Login Dialog */}
      <Dialog open={showAdminLogin} onOpenChange={setShowAdminLogin}>
        <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Acesso Administrativo
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <Label htmlFor="admin-password" className="text-gray-700 font-medium">
                Senha de Administrador
              </Label>
              <Input
                id="admin-password"
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Digite a senha"
                className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-800 py-3 rounded-full font-semibold transition-all duration-300"
            >
              Entrar
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Product Form Dialog */}
      <Dialog open={showProductForm} onOpenChange={setShowProductForm}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {editingProduct ? "Editar Produto" : "Adicionar Novo Produto"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveProduct} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="product-name" className="text-gray-700 font-medium">
                  Nome do Produto
                </Label>
                <Input
                  id="product-name"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <Label htmlFor="product-category" className="text-gray-700 font-medium">
                  Categoria
                </Label>
                <Select
                  value={productForm.category}
                  onValueChange={(value) => setProductForm({ ...productForm, category: value })}
                >
                  <SelectTrigger className="border-gray-200 focus:border-purple-500 focus:ring-purple-500">
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="product-price" className="text-gray-700 font-medium">
                  Preço Atual (R$)
                </Label>
                <Input
                  id="product-price"
                  type="number"
                  step="0.01"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <Label htmlFor="product-original-price" className="text-gray-700 font-medium">
                  Preço Original (R$)
                </Label>
                <Input
                  id="product-original-price"
                  type="number"
                  step="0.01"
                  value={productForm.originalPrice}
                  onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                  className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <Label htmlFor="product-stock" className="text-gray-700 font-medium">
                  Estoque
                </Label>
                <Input
                  id="product-stock"
                  type="number"
                  value={productForm.stock}
                  onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                  className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <Label htmlFor="product-rating" className="text-gray-700 font-medium">
                  Avaliação
                </Label>
                <Input
                  id="product-rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={productForm.rating}
                  onChange={(e) => setProductForm({ ...productForm, rating: e.target.value })}
                  className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-gray-700 font-medium">Imagem do Produto</Label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="product-image-file" className="text-sm text-gray-600">
                    Upload de Imagem
                  </Label>
                  <Input
                    id="product-image-file"
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <Label htmlFor="product-image-url" className="text-sm text-gray-600">
                    Ou URL da Imagem
                  </Label>
                  <Input
                    id="product-image-url"
                    value={productForm.image}
                    onChange={(e) => {
                      setProductForm({ ...productForm, image: e.target.value })
                      setImagePreview(e.target.value)
                      setImageFile(null)
                    }}
                    placeholder="https://exemplo.com/imagem.jpg"
                    className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Preview da imagem */}
              {imagePreview && (
                <div className="mt-4">
                  <Label className="text-sm text-gray-600 mb-2 block">Pré-visualização</Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="max-w-full max-h-48 mx-auto rounded-lg object-contain"
                      onError={() => setImagePreview("")}
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="product-reviews" className="text-gray-700 font-medium">
                Número de Avaliações
              </Label>
              <Input
                id="product-reviews"
                type="number"
                value={productForm.reviews}
                onChange={(e) => setProductForm({ ...productForm, reviews: e.target.value })}
                className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <Label htmlFor="product-description" className="text-gray-700 font-medium">
                Descrição
              </Label>
              <Textarea
                id="product-description"
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="product-active"
                  checked={productForm.isActive}
                  onChange={(e) => setProductForm({ ...productForm, isActive: e.target.checked })}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <Label htmlFor="product-active" className="text-gray-700 font-medium">
                  Ativo
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="product-promotion"
                  checked={productForm.isPromotion}
                  onChange={(e) => setProductForm({ ...productForm, isPromotion: e.target.checked })}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <Label htmlFor="product-promotion" className="text-gray-700 font-medium">
                  Promoção
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="product-new"
                  checked={productForm.isNew}
                  onChange={(e) => setProductForm({ ...productForm, isNew: e.target.checked })}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <Label htmlFor="product-new" className="text-gray-700 font-medium">
                  Novo
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="product-bestseller"
                  checked={productForm.isBestSeller}
                  onChange={(e) => setProductForm({ ...productForm, isBestSeller: e.target.checked })}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <Label htmlFor="product-bestseller" className="text-gray-700 font-medium">
                  Best Seller
                </Label>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={isUploading}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 py-3 rounded-full font-semibold transition-all duration-300 disabled:opacity-50"
              >
                {isUploading ? "Salvando..." : editingProduct ? "Salvar Alterações" : "Adicionar Produto"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowProductForm(false)}
                disabled={isUploading}
                className="px-6 py-3 rounded-full font-semibold border-gray-300 hover:bg-gray-50 transition-all duration-300 disabled:opacity-50"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Cart Dialog */}
      <Dialog open={showCart} onOpenChange={setShowCart}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent flex items-center gap-2">
              <ShoppingBag className="h-8 w-8 text-gray-700" />
              Seu Carrinho ({cart.reduce((sum, item) => sum + item.quantity, 0)} itens)
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col h-[70vh]">
            {cart.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-center">
                <div>
                  <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Seu carrinho está vazio</h3>
                  <p className="text-gray-500">Adicione alguns produtos incríveis!</p>
                  <Button
                    onClick={() => {
                      setShowCart(false)
                      setCurrentSection("produtos")
                    }}
                    className="mt-4 bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-800"
                  >
                    Ver Produtos
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto pr-2">
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <Card key={item.id} className="border border-gray-200 shadow-sm">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>

                            <div className="flex-1">
                              <h4 className="font-semibold text-lg text-gray-900">{item.name}</h4>
                              <p className="text-sm text-gray-600">Tamanho: {item.size}</p>
                              <div className="flex items-center gap-2 mt-1">
                                {item.isPromotion && item.originalPrice > item.price && (
                                  <span className="text-sm text-gray-500 line-through">
                                    R$ {item.originalPrice.toFixed(2)}
                                  </span>
                                )}
                                <span className="font-bold text-lg text-gray-900">R$ {item.price.toFixed(2)}</span>
                                {item.isPromotion && <Badge className="bg-red-500 text-white text-xs">OFERTA</Badge>}
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                  className="w-8 h-8 p-0 rounded-full"
                                >
                                  -
                                </Button>
                                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                  className="w-8 h-8 p-0 rounded-full"
                                >
                                  +
                                </Button>
                              </div>

                              <div className="text-right">
                                <p className="font-bold text-lg">R$ {(item.price * item.quantity).toFixed(2)}</p>
                                {item.isPromotion && item.originalPrice > item.price && (
                                  <p className="text-xs text-green-600">
                                    Economia: R$ {((item.originalPrice - item.price) * item.quantity).toFixed(2)}
                                  </p>
                                )}
                              </div>

                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => removeFromCart(item.id)}
                                className="w-8 h-8 p-0 rounded-full"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Cart Summary */}
                <div className="border-t pt-4 mt-4">
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-semibold">Total de itens:</span>
                      <span className="text-lg">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                    </div>

                    {cart.some((item) => item.isPromotion) && (
                      <div className="flex justify-between items-center mb-2 text-green-600">
                        <span className="font-semibold">Total economizado:</span>
                        <span className="font-bold">
                          R${" "}
                          {cart
                            .reduce(
                              (sum, item) =>
                                sum + (item.isPromotion ? (item.originalPrice - item.price) * item.quantity : 0),
                              0,
                            )
                            .toFixed(2)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-xl font-bold border-t pt-2">
                      <span>TOTAL:</span>
                      <span className="text-2xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        R$ {cartTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <CartCheckoutForm onSubmit={handleCartCheckout} />
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <main>
        {/* Admin Section */}
        {currentSection === "admin" && isAdmin && (
          <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                    Painel Administrativo
                  </h2>
                  <p className="text-gray-600">Gerencie seus produtos e ofertas</p>
                </div>
                <Button
                  onClick={handleAddProduct}
                  className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Produto
                </Button>
              </div>

              {/* Dashboard Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">Total de Produtos</p>
                        <p className="text-3xl font-bold">{products.length}</p>
                      </div>
                      <ShoppingBag className="h-8 w-8 text-blue-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm">Produtos Ativos</p>
                        <p className="text-3xl font-bold">{products.filter((p) => p.isActive).length}</p>
                      </div>
                      <Eye className="h-8 w-8 text-green-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm">Em Promoção</p>
                        <p className="text-3xl font-bold">{products.filter((p) => p.isPromotion).length}</p>
                      </div>
                      <Zap className="h-8 w-8 text-purple-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100 text-sm">Estoque Total</p>
                        <p className="text-3xl font-bold">{products.reduce((acc, p) => acc + p.stock, 0)}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-orange-200" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} isAdminView={true} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Hero Section Premium */}
        {currentSection === "inicio" && (
          <>
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
              {/* Background com gradiente animado */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20"></div>
              </div>

              {/* Imagem de fundo */}
              <div className="absolute inset-0">
                <Image src="/rv-store-logo-hero.jpeg" alt="RV STORE Logo" fill className="object-cover opacity-60" />
              </div>

              {/* Efeitos de partículas */}
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${2 + Math.random() * 3}s`,
                    }}
                  ></div>
                ))}
              </div>

              <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
                <div className="mb-6 md:mb-8 animate-fade-in-up">
                  <div className="flex justify-center mb-6 md:mb-8">
                    <Image
                      src="/rv-store-logo.png"
                      alt="RV Store Logo"
                      width={120}
                      height={120}
                      className="md:w-40 md:h-40 rounded-full shadow-2xl border-4 border-white/20"
                    />
                  </div>
                  <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-4 md:mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                      RV STORE
                    </span>
                  </h2>
                  <div className="w-16 md:w-24 h-0.5 md:h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6 md:mb-8 rounded-full"></div>
                  <p className="text-lg md:text-2xl lg:text-3xl mb-3 md:mb-4 text-gray-200 font-light">
                    Moda masculina com
                  </p>
                  <p className="text-lg md:text-2xl lg:text-3xl mb-8 md:mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">
                    atitude e personalidade
                  </p>
                </div>

                <div className="flex flex-row gap-3 md:gap-4 justify-center items-center animate-fade-in-up animation-delay-300">
                  <Button
                    onClick={() => setCurrentSection("produtos")}
                    size="lg"
                    className="bg-gradient-to-r from-white to-gray-100 text-black hover:from-gray-100 hover:to-white text-sm md:text-lg px-6 md:px-12 py-3 md:py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl"
                  >
                    Explorar Produtos
                    <ArrowRight className="h-4 w-4 md:h-5 md:w-5 ml-2" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setCurrentSection("sobre")}
                    className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-sm md:text-lg px-6 md:px-12 py-3 md:py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Sobre Nós
                  </Button>
                </div>
              </div>

              {/* Scroll indicator */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 md:py-20 bg-gradient-to-r from-gray-900 to-black text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-4 gap-4 md:gap-8 text-center">
                  <div className="group">
                    <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                      1000+
                    </div>
                    <p className="text-gray-300 text-xs md:text-base">Clientes Satisfeitos</p>
                  </div>
                  <div className="group">
                    <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                      500+
                    </div>
                    <p className="text-gray-300 text-xs md:text-base">Produtos Vendidos</p>
                  </div>
                  <div className="group">
                    <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                      5★
                    </div>
                    <p className="text-gray-300 text-xs md:text-base">Avaliação Média</p>
                  </div>
                  <div className="group">
                    <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                      24h
                    </div>
                    <p className="text-gray-300 text-xs md:text-base">Entrega Rápida</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Ofertas Section */}
            {promotions.length > 0 && (
              <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-12">
                    <h3 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">🔥 Ofertas Imperdíveis</h3>
                    <div className="w-20 h-1 bg-red-500 mx-auto mb-6 rounded"></div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      Aproveite nossos preços especiais por tempo limitado!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {promotions.map((product, index) => (
                      <div
                        key={product.id}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Featured Products */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Produtos em Destaque</h3>
                  <div className="w-20 h-1 bg-blue-500 mx-auto mb-6 rounded"></div>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Descubra nossa seleção exclusiva de peças que definem tendências
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {bestSellers.slice(0, 4).map((product, index) => (
                    <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                      <ProductCard product={product} featured={true} />
                    </div>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <Button
                    onClick={() => setCurrentSection("produtos")}
                    className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded font-semibold transition-colors duration-300"
                  >
                    Ver Todos os Produtos
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 md:py-20 bg-gradient-to-r from-gray-900 to-black text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-16">
                  <h3 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Por que escolher a RV STORE?</h3>
                  <div className="w-16 md:w-24 h-0.5 md:h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-3 gap-4 md:gap-8">
                  <div className="text-center group">
                    <div className="w-12 h-12 md:w-20 md:h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Shield className="h-6 w-6 md:h-10 md:w-10 text-white" />
                    </div>
                    <h4 className="text-lg md:text-2xl font-bold mb-2 md:mb-4">Qualidade Garantida</h4>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                      Produtos selecionados com os melhores materiais
                    </p>
                  </div>
                  <div className="text-center group">
                    <div className="w-12 h-12 md:w-20 md:h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Truck className="h-6 w-6 md:h-10 md:w-10 text-white" />
                    </div>
                    <h4 className="text-lg md:text-2xl font-bold mb-2 md:mb-4">Entrega Rápida</h4>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                      Entregamos em todo o Brasil com agilidade
                    </p>
                  </div>
                  <div className="text-center group">
                    <div className="w-12 h-12 md:w-20 md:h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Heart className="h-6 w-6 md:h-10 md:h-10 text-white" />
                    </div>
                    <h4 className="text-lg md:text-2xl font-bold mb-2 md:mb-4">Atendimento Premium</h4>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                      Suporte personalizado para cada cliente
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Products Section Premium */}
        {currentSection === "produtos" && (
          <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3 md:mb-4">
                  Nossa Coleção
                </h2>
                <div className="w-16 md:w-24 h-0.5 md:h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4 md:mb-6 rounded-full"></div>
                <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
                  Explore nossa seleção completa de produtos premium
                </p>
              </div>

              {/* Search and Filter Section */}
              <div className="mb-12 space-y-6">
                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                  <Button
                    variant={selectedCategory === "Todos" ? "default" : "outline"}
                    onClick={() => setSelectedCategory("Todos")}
                    className="text-xs md:text-sm px-3 md:px-4 py-2"
                  >
                    Todos
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category)}
                      className="text-xs md:text-sm px-3 md:px-4 py-2"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Results Counter */}
              {(searchTerm || selectedCategory !== "Todos") && (
                <div className="text-center">
                  <p className="text-gray-600">
                    {activeProducts.length === 0
                      ? "Nenhum produto encontrado"
                      : `${activeProducts.length} produto${activeProducts.length !== 1 ? "s" : ""} encontrado${activeProducts.length !== 1 ? "s" : ""}`}
                    {searchTerm && ` para "${searchTerm}"`}
                    {selectedCategory !== "Todos" && ` na categoria "${selectedCategory}"`}
                  </p>
                </div>
              )}

              {activeProducts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-600 mb-2">Nenhum produto encontrado</h3>
                  <p className="text-gray-500 mb-6">Tente ajustar sua pesquisa ou filtros</p>
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("Todos")
                    }}
                    className="bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-800"
                  >
                    Limpar Filtros
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {activeProducts.map((product, index) => (
                    <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* About Section Premium */}
        {currentSection === "sobre" && (
          <section className="py-16 md:py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3 md:mb-4">
                  Sobre a RV STORE
                </h2>
                <div className="w-16 md:w-24 h-0.5 md:h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4 md:mb-6 rounded-full"></div>
              </div>

              <div className="grid grid-cols-3 gap-6 md:gap-12 mt-12 md:mt-16">
                <div className="text-center group">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Star className="h-8 w-8 md:h-12 md:w-12 text-white" />
                  </div>
                  <h3 className="font-bold text-lg md:text-2xl mb-2 md:mb-4 text-gray-900">Qualidade Premium</h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    Peças selecionadas com os melhores materiais
                  </p>
                </div>
                <div className="text-center group">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Truck className="h-8 w-8 md:h-12 md:w-12 text-white" />
                  </div>
                  <h3 className="font-bold text-lg md:text-2xl mb-2 md:mb-4 text-gray-900">Entrega Nacional</h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    Enviamos para todo o Brasil com segurança
                  </p>
                </div>
                <div className="text-center group">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Heart className="h-8 w-8 md:h-12 md:w-12 text-white" />
                  </div>
                  <h3 className="font-bold text-lg md:text-2xl mb-2 md:mb-4 text-gray-900">Atendimento Exclusivo</h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    Suporte personalizado via WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Contact Section Premium */}
        {currentSection === "contato" && (
          <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3 md:mb-4">
                  Entre em Contato
                </h2>
                <div className="w-16 md:w-24 h-0.5 md:h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4 md:mb-6 rounded-full"></div>
                <p className="text-base md:text-xl text-gray-600">Estamos aqui para ajudar você</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                <div className="bg-gradient-to-br from-white to-gray-50 p-6 md:p-8 rounded-3xl shadow-2xl border border-gray-100">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Fale Conosco
                  </h3>
                  <div className="space-y-4 md:space-y-6">
                    <div className="flex items-center space-x-3 md:space-x-4 group">
                      <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Phone className="h-5 w-5 md:h-7 md:w-7 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm md:text-base">WhatsApp</p>
                        <p className="text-gray-600 text-sm md:text-base">(81) 99663-0750</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 md:space-x-4 group">
                      <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Instagram className="h-5 w-5 md:h-7 md:w-7 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm md:text-base">Instagram</p>
                        <p className="text-gray-600 text-sm md:text-base">@rvstore.1</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 md:space-x-4 group">
                      <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <MapPin className="h-5 w-5 md:h-7 md:w-7 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm md:text-base">Localização</p>
                        <p className="text-gray-600 text-sm md:text-base">
                          Av. Gov. Agamenon Magalhães N° 644
                          <br />
                          CAVALEIRO - Olinda, PE
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-black p-6 md:p-8 rounded-3xl shadow-2xl text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Horário de Atendimento</h3>
                  <div className="space-y-3 md:space-y-4 text-gray-300 mb-6 md:mb-8">
                    <p className="flex justify-between text-sm md:text-base">
                      <span className="font-medium text-white">Segunda a Sexta:</span>
                      <span>9h às 18h</span>
                    </p>
                    <p className="flex justify-between text-sm md:text-base">
                      <span className="font-medium text-white">Sábado:</span>
                      <span>9h às 14h</span>
                    </p>
                    <p className="flex justify-between text-sm md:text-base">
                      <span className="font-medium text-white">Domingo:</span>
                      <span>Fechado</span>
                    </p>
                  </div>

                  <Button
                    onClick={() =>
                      window.open(
                        "https://wa.me/5581996630750?text=Olá! Gostaria de mais informações sobre os produtos da RV STORE.",
                        "_blank",
                      )
                    }
                    className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Falar no WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer Premium */}
      <footer className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3 md:mb-4">
                RV STORE
              </h3>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4 md:mb-6 max-w-md">
                Moda masculina com atitude e personalidade. Entregamos para todo o Brasil com segurança e agilidade.
              </p>
              <div className="flex space-x-3 md:space-x-4">
                <div
                  className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                  onClick={() => window.open("https://wa.me/5581996630750", "_blank")}
                >
                  <Phone className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <div
                  className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                  onClick={() => window.open("https://www.instagram.com/rvstore.1?igsh=MXI1ejQ5ajE2NjQyMg==", "_blank")}
                >
                  <Instagram className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg md:text-xl mb-4 md:mb-6 text-white">Links Rápidos</h4>
              <div className="space-y-2 md:space-y-3">
                <button
                  onClick={() => setCurrentSection("inicio")}
                  className="block text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 transform text-sm md:text-base"
                >
                  Início
                </button>
                <button
                  onClick={() => setCurrentSection("produtos")}
                  className="block text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 transform text-sm md:text-base"
                >
                  Produtos
                </button>
                <button
                  onClick={() => setCurrentSection("sobre")}
                  className="block text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 transform text-sm md:text-base"
                >
                  Sobre
                </button>
                <button
                  onClick={() => setCurrentSection("contato")}
                  className="block text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 transform text-sm md:text-base"
                >
                  Contato
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg md:text-xl mb-4 md:mb-6 text-white">Contato</h4>
              <div className="space-y-2 md:space-y-3 text-gray-300">
                <p className="flex items-center text-sm md:text-base">
                  <Phone className="h-3 w-3 md:h-4 md:w-4 mr-2 text-green-400" />
                  (81) 99663-0750
                </p>
                <p className="flex items-center text-sm md:text-base">
                  <Instagram className="h-3 w-3 md:h-4 md:w-4 mr-2 text-pink-400" />
                  @rvstore.1
                </p>
                <p className="flex items-start text-sm md:text-base">
                  <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-2 mt-1 text-red-400 flex-shrink-0" />
                  <span>
                    Av. Gov. Agamenon Magalhães N° 644
                    <br />
                    CAVALEIRO - Olinda, PE
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-center md:text-left text-sm md:text-base">
                &copy; 2024 RV STORE. Todos os direitos reservados.
              </p>
              <div className="flex items-center mt-3 md:mt-0">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-gray-400 text-xs md:text-sm">Desenvolvido com ❤️</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
        }
        
        .backdrop-blur-md {
          backdrop-filter: blur(12px);
        }
      `}</style>

      {showProductModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowProductModal(false)}
                className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm hover:bg-white"
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="aspect-square relative">
                <Image
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover rounded-t-2xl"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-black/10 text-black">{selectedProduct.category}</Badge>
                  {selectedProduct.isPromotion && (
                    <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white">OFERTA</Badge>
                  )}
                  {selectedProduct.isNew && (
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">NOVO</Badge>
                  )}
                  {selectedProduct.isBestSeller && (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">⭐ BEST</Badge>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">{selectedProduct.description}</p>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(selectedProduct.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({selectedProduct.reviews} avaliações)</span>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex flex-col">
                    {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                      <span className="text-lg text-gray-400 line-through">
                        R$ {selectedProduct.originalPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      R$ {selectedProduct.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tamanho:</label>
                    <div className="flex gap-2 flex-wrap">
                      {selectedProduct.sizes.map((size) => (
                        <Button key={size} variant="outline" size="sm" className="min-w-[3rem] bg-transparent">
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Adicionar ao Carrinho
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
